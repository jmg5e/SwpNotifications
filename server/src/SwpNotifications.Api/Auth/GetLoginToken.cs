using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SwpNotifications.Api.models;
using SwpNotifications.Data;
using SwpNotifications.Data.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SwpNotifications.Api.Auth {
    public class GetLoginToken {
        public static TokenProviderOptions GetOptions(IConfiguration Configuration) {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("TokenAuthentication:SecretKey").Value));

            return new TokenProviderOptions
            {
                Path = Configuration.GetSection("TokenAuthentication:TokenPath").Value,
                Audience = Configuration.GetSection("TokenAuthentication:Audience").Value,
                Issuer = Configuration.GetSection("TokenAuthentication:Issuer").Value,
                Expiration = TimeSpan.FromMinutes(Convert.ToInt32(Configuration.GetSection("TokenAuthentication:ExpirationMinutes").Value)),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            };
        }
        public static LoginResponse Execute(ApplicationUser user, AppDbContext db, IConfiguration config, RefreshToken refreshToken = null) {
            var options = GetOptions(config);
            var now = DateTime.UtcNow;

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            };

            if(user.SerializedHubGroups != null) {
                claims.Add(new Claim("HubGroups", user.SerializedHubGroups));
            }

            /* better to use UserManager or manually map claims from context? */
            var userClaims = db.UserClaims.Where(i => i.UserId == user.Id);
            foreach (var userClaim in userClaims) {
                claims.Add(new Claim(userClaim.ClaimType, userClaim.ClaimValue));
            }

            var userRoles = db.UserRoles.Where(i => i.UserId == user.Id);
            foreach (var userRole in userRoles) {
                var role = db.Roles.Single(i => i.Id == userRole.RoleId);
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            // no refresh token provided
            if (refreshToken == null) {
                refreshToken = new RefreshToken()
                {
                    UserId = user.Id,
                    Token = Guid.NewGuid().ToString("N"),
                };
                db.InsertNew(refreshToken);
            }

            refreshToken.IssuedUtc = now;
            refreshToken.ExpiresUtc = now.Add(options.Expiration);
            db.SaveChanges();

            var jwt = new JwtSecurityToken(
                issuer: options.Issuer,
                audience: options.Audience,
                claims: claims.ToArray(),
                notBefore: now,
                expires: now.Add(options.Expiration),
                signingCredentials: options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new LoginResponse
            {
                accessToken = encodedJwt,
                refreshToken = refreshToken.Token,
                expires_in = (int)options.Expiration.TotalSeconds,
                userName = user.UserName,
                isAdmin = user.IsAdmin,
                hubGroups = user.HubGroups,
            };
            return response;
        }
    }
}
