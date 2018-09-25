using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {

    public class LocationDto
    {
        public int? Id { get; set; }
        [Required]
        public string Moniker { get; set; }
        public string Floor { get; set; }
    }
}
