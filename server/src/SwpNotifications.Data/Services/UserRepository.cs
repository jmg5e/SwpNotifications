using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services {
    public class UserRepository : IUserRepository {
        public UserManager<ApplicationUser> _userManager { get; private set; }
        private RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<DbInitializer> _logger;
        private AppDbContext _db { get; set; }

        public UserRepository(
                UserManager<ApplicationUser> userManager,
                RoleManager<IdentityRole> roleManager,
                AppDbContext db,
                ILogger<DbInitializer> logger) {
            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
            _logger = logger;
        }

        public async Task<bool> UserExists(string userId) {
            var user = await _userManager.FindByIdAsync(userId);
            return (user != null);
        }

        public IEnumerable<ApplicationUser> GetUsers() {
            return _db.Users.ToList();
        }

        public ApplicationUser GetUser(string userId) {
            return _db.Users.FirstOrDefault(u => u.Id == userId);
        }

        public ApplicationUser GetUserByUserName(string userName) {
            return _db.Users.FirstOrDefault(u => u.UserName == userName);
        }

        public async Task<IdentityResult> UpdateUserRolesAsync(ApplicationUser user) {
            var hasAdminRole = await _userManager.IsInRoleAsync(user, "Admin");
            if (user.IsAdmin && !hasAdminRole) {
                _logger.LogInformation($"Adding Admin role to User:{user.Id}");
                return await _userManager.AddToRoleAsync(user, "Admin");
            }
            if (!user.IsAdmin && hasAdminRole) {
                _logger.LogInformation($"Removing Admin role to User:{user.Id}");
                return await _userManager.RemoveFromRoleAsync(user, "Admin");
            }

            DeleteUserToken(user);

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> AddUserAsync(ApplicationUser user, string password) {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<IdentityResult> DeleteUserAsync(ApplicationUser user) {
            DeleteUserToken(user);
            return await _userManager.DeleteAsync(user);
        }

        public async Task<IdentityResult> ChangeUserEmailAsync(ApplicationUser user, string newEmail) {
            var resetToken = await _userManager.GenerateChangeEmailTokenAsync(user, newEmail);
            return await _userManager.ChangeEmailAsync(user, resetToken, newEmail);
        }

        public async Task<IdentityResult> ChangeUserPasswordAsync(ApplicationUser user, string newPassword) {
            DeleteUserToken(user);
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            return await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
        }

        bool IUserRepository.UserExists(string userId) {
            return _db.Users.Any(u => u.Id == userId);
        }

        public async Task<IdentityResult> UpdateUserLockedStatus(ApplicationUser user, bool isLocked) {
            if (isLocked && !user.IsLocked) { //lockout user
                DeleteUserToken(user);
                user.IsLocked = true;
                var lockoutEndDate = new DateTime(2999, 01, 01);
                await _userManager.SetLockoutEndDateAsync(user, lockoutEndDate);
                return await _userManager.SetLockoutEnabledAsync(user, true);
            }

            if (!isLocked && user.IsLocked) { // remove lockout
                user.IsLocked = false;
                await _userManager.SetLockoutEndDateAsync(user, DateTime.Now);
                return await _userManager.SetLockoutEnabledAsync(user, false);
            }
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> LockoutUserAsync(ApplicationUser user) {
            DeleteUserToken(user);
            var lockoutEndDate = new DateTime(2999, 01, 01);
            await _userManager.SetLockoutEndDateAsync(user, lockoutEndDate);
            return await _userManager.SetLockoutEnabledAsync(user, true);
        }

        public async Task<IdentityResult> RemoveUserLockoutAsync(ApplicationUser user) {
            await _userManager.SetLockoutEndDateAsync(user, DateTime.Now);
            return await _userManager.SetLockoutEnabledAsync(user, false);
        }

        private void DeleteUserToken(ApplicationUser user) {
            var userToken = _db.RefreshTokens.FirstOrDefault(r => r.User == user);
            if (userToken != null) {
                _db.RefreshTokens.Remove(userToken);
                if (_db.SaveChanges() < 0) {
                    _logger.LogError($"Error Deleting Token For User: {user.Id}");
                }
            }
        }

        public bool Save() {
            return (_db.SaveChanges() >= 0);
        }
    }
}
