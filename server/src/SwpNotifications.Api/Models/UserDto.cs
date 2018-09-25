using System.Collections.Generic;

namespace SwpNotifications.Api.Models
{
    public class UserDto
    {
        public string UserName { get; set; }
        // public string Email { get; set; }
        public string Id { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsLocked { get; set; }
        public IEnumerable<string> HubGroups { get; set; }
    }
}
