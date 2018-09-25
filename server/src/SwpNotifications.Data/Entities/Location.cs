using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwpNotifications.Data.Entities
{
    public class Location
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(10)]
        public string Moniker { get; set; }

        [MaxLength(20)]
        public string Floor { get; set; }
        public ICollection<Product> Products { get; set; }
               = new List<Product>();
    }

}
