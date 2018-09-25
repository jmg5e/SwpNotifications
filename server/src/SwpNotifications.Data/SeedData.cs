using System.Collections.Generic;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data {

    public class SeedData
    {
        public List<Location> locations { get; set; }   
        public List<User> Users { get; set; }   
    }

    public class User {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; } = false;
        public IEnumerable<string> HubGroups { get; set; } = new List<string>();
    }
}
