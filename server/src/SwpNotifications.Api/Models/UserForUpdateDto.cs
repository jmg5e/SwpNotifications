using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {
    public class  UserForUpdateDto
    {
        // [Required]
        // public int Id { get; set; }
        // public string UserName { get; set; }
        // [Required]
        public string Password { get; set; }
        public bool? isAdmin { get; set; }
        public bool? isLocked { get; set; }
        public string[] hubGroups { get; set; }

        // public string Group { get; set; }
        // public string Email { get; set; }
    }
}
