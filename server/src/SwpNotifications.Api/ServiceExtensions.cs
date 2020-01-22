using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SwpNotifications.Data;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Api {
    public static class ServiceExtensions {

        public static void ConfigureCors(this IServiceCollection services) {
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", builder => {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    // .AllowAnyOrigin()
                    .WithOrigins("http://localhost:3000")
                    .AllowCredentials();
                });
            });

        }
        public static void ConfigureAuth(this IServiceCollection services, IConfiguration configuration) {
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options => {
                var keyByteArray = Encoding.ASCII.GetBytes(configuration["TokenAuthentication:SecretKey"]);
                var signingKey = new SymmetricSecurityKey(keyByteArray);
                options.RequireHttpsMetadata = false;
                options.IncludeErrorDetails = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["TokenAuthentication:Issuer"],
                    ValidAudience = configuration["TokenAuthentication:Audience"],
                    IssuerSigningKey = signingKey,
                };
                // We have to hook the OnMessageReceived event in order to
                // allow the JWT authentication handler to read the access
                // token from the query string when a WebSocket or 
                // Server-Sent Events request comes in.
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context => {
                        var accessToken = context.Request.Query["access_token"];

                        // If the request is for hub
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/SwpHub"))) {
                            // Read token from the query string
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            /* By removing the "sub" claim from Microsfoft claim type map, it will reappear in your ClaimsPrincipal */
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            services.AddAuthorization(options => {
                options.AddPolicy(
                    "RequestListener",
                    policyBuilder => policyBuilder.RequireAssertion(
                        context => context.User.HasClaim(claim =>
                                       claim.Type == "HubGroups" && claim.Value.Contains("RequestListener"))
                    ));
                options.AddPolicy(
                    "ClientListener",
                    policyBuilder => policyBuilder.RequireAssertion(
                        context => context.User.HasClaim(claim =>
                                       claim.Type == "HubGroups" && claim.Value.Contains("ClientListener"))
                    ));
            });
        }

        public static void ConfigureDataStore(this IServiceCollection services, IConfiguration configuration) {
            var connectionString = configuration["ConnectionStrings:Postgress"];

            services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>
                (o => o.UseNpgsql(connectionString));
        }

        public static void ConfigureInMemoryDb(this IServiceCollection services) {
            services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("SwpNofictions_dev_db"));
        }

        public static void ConfigureIdentity(this IServiceCollection services) {
            services.AddIdentity<ApplicationUser, IdentityRole>(options => {
                // Lockout settings
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }
        public static void ConfigureAutomapper(this IServiceCollection services) {
            // https://github.com/AutoMapper/AutoMapper/issues/2399
            var autoMapperConfig = new MapperConfiguration(cfg => {
                cfg.CreateMap<string, Location>()
                .ForMember(dest => dest.Moniker, opts => opts.MapFrom(dest => dest));
                cfg.CreateMap<Location, Models.LocationDto>()
                .ReverseMap();
                cfg.CreateMap<Location, Models.LocationWithProductsDto>()
                .ReverseMap();
                cfg.CreateMap<Product, Models.ProductDto>()
                .ReverseMap();
                cfg.CreateMap<ApplicationUser, Models.UserDto>()
                .ReverseMap();
                cfg.CreateMap<Request, Models.RequestDto>().ReverseMap();
            });

            services.AddSingleton<IMapper>(new Mapper(autoMapperConfig));
        }

        public static void ConfigureLogging(this IServiceCollection services) {
            services.AddLogging();
            // builder =>
            // {
            //     builder.AddFilter("Microsoft", LogLevel.Warning)
            //         .AddFilter("System", LogLevel.Warning)
            //         .AddConsole();
            // });
        }
    }
}
