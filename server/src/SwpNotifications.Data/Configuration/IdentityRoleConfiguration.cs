using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Configuration {
    public class IdentityRoleConfiguration : IEntityTypeConfiguration<IdentityRole> {
        public void Configure(EntityTypeBuilder<IdentityRole> builder) {

            builder.HasData(new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "Admin".ToUpper(),
            });

            builder.HasData(new IdentityRole
            {
                Name = "RequestListener",
                NormalizedName = "RequestListener".ToUpper(),
            });

            builder.HasData(new IdentityRole
            {
                Name = "ClientListener",
                NormalizedName = "ClientListener".ToUpper(),
            });
        }
    }

}
