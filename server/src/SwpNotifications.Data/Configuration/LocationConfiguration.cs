using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Configuration
{
    public class LocationConfiguration : IEntityTypeConfiguration<Location> {
        public void Configure(EntityTypeBuilder<Location> builder) {
            builder.HasMany(s => s.Products)
                .WithOne(l => l.Location)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasIndex(l => l.Moniker).IsUnique();
        }
    }

}
