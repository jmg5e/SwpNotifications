using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SwpNotifications.Api.Models {

    public class LocationWithProductsDto
    {
        public int Id { get; set; }
        [Required]
        public string Moniker { get; set; }
        public string Floor { get; set; }

        public int NumberOfProducts { get
            {
                return Products.Count;
            }
        }

        public ICollection<ProductDto> Products { get; set; }
        = new List<ProductDto>();
    }
}
