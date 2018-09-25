using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SwpNotifications.Api.Auth;
using SwpNotifications.Api.models;
using SwpNotifications.Data;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private AppDbContext _dbContext;
        private IConfiguration _config;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger,
            AppDbContext dbContext,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration config,
            UserManager<ApplicationUser> userManager) {
            _logger = logger;
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpPost("token")]
        public async Task<IActionResult> LoginRequest([FromBody] UserCredentials credentials) {
            try {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _signInManager.PasswordSignInAsync(credentials.userName, credentials.password, false, lockoutOnFailure: false);
                if (!result.Succeeded) {
                    if(result.IsLockedOut)
                        return BadRequest("User is locked out.");

                    return BadRequest("Invalid username or password");
                }

                var user = await _userManager.Users
                    .SingleAsync(u => u.UserName == credentials.userName);

                if (user == null) {
                    return BadRequest("Invalid username or password.");
                }

                var refreshToken = _dbContext.RefreshTokens.FirstOrDefault( r => r.User == user);
                if(refreshToken == null) {
                    var loginResponse = GetLoginToken.Execute(user, _dbContext, _config);
                    return Ok(loginResponse);
                }
                else {
                    var loginResponse = GetLoginToken.Execute(user, _dbContext, _config, refreshToken);
                    return Ok(loginResponse);
                }

            } catch (Exception ex) {
                _logger.LogError($"Error creating jwt token: {ex}");
            }

            return BadRequest("Falied to generate token.");
        }

        [HttpPost("renew")]
        /* TODO bugged on mobile(request does not end)? something to do with ssl certificate i think */
        public async Task<IActionResult> RenewTokenRequest([FromBody] string refreshToken) {
            try {
                if (string.IsNullOrWhiteSpace(refreshToken)) {
                    return BadRequest("no refresh token provided");
                }

                var userRefreshToken = _dbContext.RefreshTokens
                    .Include(x => x.User)
                    .SingleOrDefault(i => i.Token == refreshToken);

                if (userRefreshToken == null) {
                    return BadRequest("User must login again.");
                }

                var canSignIn = await _signInManager.CanSignInAsync(userRefreshToken.User);
                if (!canSignIn) {
                    return BadRequest("User is unable to log in.");
                }
                if (_userManager.SupportsUserLockout && await _userManager.IsLockedOutAsync(userRefreshToken.User)) {
                    return BadRequest("User is locked out");
                }
                var user = userRefreshToken.User;
                var loginResponse = GetLoginToken.Execute(user, _dbContext, _config, userRefreshToken);
                return Ok(loginResponse);

            } catch (Exception ex) {
                _logger.LogError($"Error renewing jwt token: {ex}");
            }
            return BadRequest("Falied to renew token.");
        }
    }
}
