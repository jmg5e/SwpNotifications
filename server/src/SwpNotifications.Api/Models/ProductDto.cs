using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {

    public class ProductDto {
        public int? Id { get; set; }

        [Required]
        [StringLength(40, MinimumLength = 3 , ErrorMessage = "Product Name cannot be longer than 40 characters and less than 3 characters")]
        public string Name { get; set; }

        [Required]
        /* Required only works for nullable types for some reason(find out whats going on) */
        public int? LocationId { get; set; }

        [StringLength(5)]
        public string Slot { get; set; }
    }
}
