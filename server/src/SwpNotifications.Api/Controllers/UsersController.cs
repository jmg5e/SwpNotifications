using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;
using SwpNotifications.Data.Services;
using SwpNotifications.Api.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using SwpNotifications.Data.Entities;
using System.Security.Claims;

namespace SwpNotifications.Api.Controllers {
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : Controller {
        private readonly IUserRepository _userRepository;
        private IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper) {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get() {
            var users = _userRepository.GetUsers();
            var result = _mapper.Map<List<UserDto>>(users);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]  NewUserDto newUser) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = newUser.userName,
                IsAdmin = newUser.isAdmin,
            };

            var createdResult = await _userRepository.AddUserAsync(user, newUser.password);
            if (!createdResult.Succeeded) {
                return BadRequest(createdResult.Errors);
            }

            await _userRepository.UpdateUserRolesAsync(user);
            if (!_userRepository.Save()) {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            var createdUser = _userRepository.GetUserByUserName(newUser.userName);
            var result = _mapper.Map<UserDto>(createdUser);
            return Created($"/api/users/{createdUser.Id}", result);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody]  UserForUpdateDto updatedUser) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = _userRepository.GetUser(userId);
            if (user == null)
                return NotFound();

            if (!String.IsNullOrEmpty(updatedUser.Password)) {
                var updatePasswordResult = await _userRepository.ChangeUserPasswordAsync(user, updatedUser.Password);
                if (!updatePasswordResult.Succeeded) {
                    return BadRequest(updatePasswordResult.Errors);
                }
            }

            string currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (updatedUser.isAdmin.HasValue) {
                if (currentUserId == userId) {
                    return BadRequest("Cannot change admin status of own account");
                }
                user.IsAdmin = updatedUser.isAdmin.Value;
                var updateIsAdminResult = await _userRepository.UpdateUserRolesAsync(user);
                if (!updateIsAdminResult.Succeeded) {
                    return BadRequest(updateIsAdminResult.Errors);
                }
            }

            if (updatedUser.isLocked.HasValue) {
                if (currentUserId == userId) {
                    return BadRequest("Cannot Lock or Unlock your own account");
                }
                var setUserLockoutResult = await _userRepository.UpdateUserLockedStatus(user, updatedUser.isLocked.Value);
                if (!setUserLockoutResult.Succeeded) {
                    return BadRequest(setUserLockoutResult.Errors);
                }
            }

            if (updatedUser.hubGroups != null) {
                user.HubGroups = updatedUser.hubGroups;
            }

            if (!_userRepository.Save()) {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return NoContent();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId) {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var user = _userRepository.GetUser(userId);

            string currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (currentUserId == userId) {
                return BadRequest($"You cannot delete your own account");
            }

            var result = await _userRepository.DeleteUserAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }
    }
}
