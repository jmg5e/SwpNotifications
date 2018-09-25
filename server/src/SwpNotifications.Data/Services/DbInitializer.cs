using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services {
    public class DbInitializer : IDbInitializer {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<DbInitializer> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DbInitializer(
                AppDbContext context,
                UserManager<ApplicationUser> userManager,
                RoleManager<IdentityRole> roleManager,
                ILogger<DbInitializer> logger,
                IHostingEnvironment hostingEnvironment
                ) {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task InitializeDbAsync(bool reset = false) {
            _logger.LogInformation("Initializing Db.");
            if (reset)
                await _context.Database.EnsureDeletedAsync();
            await _context.Database.EnsureCreatedAsync();
        }
        public async Task EnsureAdminAccountCreatedAsync(IConfiguration configuration) {
            if (!_context.Users.Any(u => u.IsAdmin)) {
                _logger.LogInformation("Creating Admin Account.");

                var serializedHubGroups = JsonConvert.SerializeObject(new string[] {
                        "ClientListener", "RequestListener"
                    });
                var admin = new ApplicationUser
                {
                    UserName = configuration["AdminAccount:UserName"],
                    Email = "admin@email.com",
                    EmailConfirmed = true,
                    IsAdmin = true,
                    SerializedHubGroups = serializedHubGroups,
                };

                var result = await _userManager.CreateAsync(admin, configuration["AdminAccount:Password"]);

                if (!result.Succeeded) {
                    _logger.LogWarning("Failed to create Admin Account.", result.Errors);
                    return;
                }

                var addToRoleResult = await _userManager.AddToRoleAsync(admin, "Admin");

                if (!addToRoleResult.Succeeded) {
                    _logger.LogWarning("Failed add Role to Admin Account.", addToRoleResult.Errors);
                }
            }
        }

        public async Task SeedDataAsync() {
            try {
                if (!_context.Locations.Any()) {
                    string contentRootPath = _hostingEnvironment.ContentRootPath;
                    var file = $"{_hostingEnvironment.EnvironmentName}.json";
                    var seedFile = Path.Combine(contentRootPath, "seed", file);
                    if (!File.Exists(seedFile)) {
                        _logger.LogError($"Error Seeding Data: {seedFile} could not be found.");
                        return;
                    }
                    var seedData = JsonConvert.DeserializeObject<SeedData>(File.ReadAllText(seedFile));
                    SeedLocations(seedData.locations);
                    await SeedUsersAsync(seedData.Users);
                }
                _context.SaveChanges();
            } catch (Exception e) {
                _logger.LogError("Error Seeding Data.", e);
                throw e;
            }
        }

        private void SeedLocations(List<Location> locations) {
            if (!_context.Locations.Any()) {
                _context.Locations.AddRange(locations);
                _context.SaveChanges();
            }
        }

        private async Task SeedUsersAsync(List<User> users) {
            foreach (var user in users) {
                var userToAdd = new ApplicationUser
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    EmailConfirmed = true,
                    HubGroups = user.HubGroups,
                };

                var result = await _userManager.CreateAsync(userToAdd, user.Password);

                // var hubGroupsClaim = new Claim("HubGroups", userToAdd.SerializedHubGroups, "json");
                // await _userManager.AddClaimAsync(userToAdd, hubGroupsClaim);

                if (!result.Succeeded) {
                    _logger.LogWarning($"Failed to create User:{userToAdd.UserName}, {result.Errors.ToString()}");
                }
            }
        }
    }
}
