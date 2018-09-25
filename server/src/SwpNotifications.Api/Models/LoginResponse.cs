using System.Collections.Generic;

namespace SwpNotifications.Api.models {
    public class LoginResponse
    {
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
        public int expires_in { get; set; }
        public string userName { get; set; }
        public string firstName { get; set; }
        public bool isAdmin { get; set; }
        public IEnumerable<string> hubGroups { get; set; }
    }
}
