using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data {
    public static class DbContextExtensions {

        public static bool AllMigrationsApplied(this AppDbContext context) {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static void SeedDataForTests(this AppDbContext context) {
            if (!context.Locations.Any()) {
                var locations = new List<Location>() {
                    new Location() {
                        // Id=1,
                        Moniker = "loc1",
                        Floor = "Floor1",
                        Products = new List<Product>() {
                            new Product() {
                                // Id = 1,
                                Name = "Product1",
                                Slot = "1a"
                            },
                            new Product() {
                                // Id = 2,
                                Name = "Product2",
                                Slot = "2a"
                            },
                        }
                    },
                    new Location() {
                        // Id=2,
                        Moniker = "loc2",
                        Floor = "Floor1",
                        Products = new List<Product>() {
                            new Product() {
                                // Id = 3,
                                Name = "Product3",
                                Slot = "1a"
                            },
                            new Product() {
                                // Id = 4,
                                Name = "Product4",
                                Slot = "2"
                            },
                        }
                    },
                    new Location()
                    {
                        // Id=3,
                        Moniker = "loc3",
                        Floor = "Floor2",
                        Products = new List<Product>() {
                            new Product() {
                                // Id = 5,
                                Name = "Product5",
                                Slot = "3a"
                            },
                            new Product() {
                                // Id = 6,
                                Name = "Product6",
                                Slot = "3b"
                            },
                            new Product() {
                                // Id = 7,
                                Name = "Product7",
                                Slot = "13"
                            },
                        }
                        },
                    };
                context.Locations.AddRange(locations);
                context.SaveChanges();
            }

            if (!context.Requests.Any()) {
                var requests = new List<Request>() {
                    new Request() {
                        Product=context.Products.FirstOrDefault(),
                    }
                };

                context.Requests.AddRange(requests);
                context.SaveChanges();
            }
        }
    }
}
