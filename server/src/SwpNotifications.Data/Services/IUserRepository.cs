using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services {
    public interface IUserRepository {
        IEnumerable<ApplicationUser> GetUsers();
        ApplicationUser GetUser(string userId);
        ApplicationUser GetUserByUserName(string userName);
        Task<IdentityResult> AddUserAsync(ApplicationUser user, string password);
        Task<IdentityResult> DeleteUserAsync(ApplicationUser user);
        Task<IdentityResult> ChangeUserPasswordAsync(ApplicationUser user, string newPassword);
        Task<IdentityResult> ChangeUserEmailAsync(ApplicationUser user, string newEmail);
        Task<IdentityResult> UpdateUserRolesAsync(ApplicationUser user);
        Task<IdentityResult> UpdateUserLockedStatus(ApplicationUser user, bool isLocked);
        Task<IdentityResult> LockoutUserAsync(ApplicationUser user);
        Task<IdentityResult> RemoveUserLockoutAsync(ApplicationUser user);
        bool UserExists(string userId);
        bool Save();
    }
}
