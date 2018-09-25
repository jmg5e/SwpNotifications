using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {
    public class  UserForCreationDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }

        public bool IsAdmin { get; set; } = false;
    }
}
