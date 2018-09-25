using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {
    public class NewUserDto
    {
        [Required]
        public string userName { get; set; }
        [Required]
        public string password { get; set; }

        public bool isAdmin { get; set; } = false;
    }
}
