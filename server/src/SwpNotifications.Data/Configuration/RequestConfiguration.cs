using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Configuration
{
    public class RequestConfiguration : IEntityTypeConfiguration<Request> {
        public void Configure(EntityTypeBuilder<Request> builder) {

            builder
                .HasOne(r => r.Product)
                .WithOne()
                .IsRequired();
            builder
                .Property(r => r.ClientId)
                .IsRequired(false);
            builder
                .Property(r => r.ClientIdentifier)
                .IsRequired(false);
        }
    }

}
