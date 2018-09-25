using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product> {
        public void Configure(EntityTypeBuilder<Product> builder) {

            builder.Property(b => b.Name)
                .IsRequired();

            builder.HasIndex(b => b.Name)
                .IsUnique();

            // builder.HasOne(p => p.Location)
            //     .WithMany(l => l.Products)
            //     .HasForeignKey(p => p.LocationMoniker)
            //     .HasPrincipalKey(l => l.Moniker);
        }
    }

}
