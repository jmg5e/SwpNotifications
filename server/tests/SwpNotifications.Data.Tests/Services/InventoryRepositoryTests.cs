using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SwpNotifications.Data.Entities;
using SwpNotifications.Data.Services;
using Xunit;

namespace SwpNotifications.Data.Tests {
    public class InventoryRepositoryTests {
        private static AppDbContext CreateDbContext() {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString());

            var context = new AppDbContext(builder.Options);
            context.SeedDataForTests();

            return context;
        }

        [Fact]
        public void GetLocationsTest() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetLocations();

            Assert.Equal(3, result.Count());
            Assert.Equal(context.Locations, result);
        }

        [Fact]
        public void GetLocationsWithProductsTest() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetLocationsWithProducts();
            Assert.NotNull(result);
            Assert.Equal(3, result.Count());
            Assert.Equal(1, result.Count(l => l.Moniker == "loc1" && l.Products.Count() == 2));
        }

        [Fact]
        public void GetLocationByIdShouldReturnLocation() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetLocationById(context.Locations.FirstOrDefault().Id);
            Assert.Equal("loc1", result.Moniker);
        }

        [Fact]
        public void GetLocationByMonikerShouldReturnLocation() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetLocationByMoniker("loc1");
            Assert.NotNull(result);
            Assert.Equal("loc1", result.Moniker);
        }

        [Fact]
        public void GetLocationByMonikerShouldReturnNull() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetLocationByMoniker("blah");
            Assert.Null(result);
        }

        [Fact]
        public void GetProductsShouldReturnCorrectResult() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetProducts();
            Assert.NotNull(result);
            Assert.Equal(7, result.Count());
        }

        [Fact]
        public void GetProductByIdShouldReturnCorrectResult() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            var result = repo.GetProductById(context.Products.FirstOrDefault().Id);
            Assert.NotNull(result);
            Assert.Equal("Product1", result.Name);
        }

        [Fact]
        public void AddLocationTest() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            Assert.Equal(3, context.Locations.Count());
            repo.AddLocation(new Location()
            {
                Moniker = "newLocation",
                Floor = "floor1",
            });
            Assert.Equal(true, repo.Save());
            Assert.Equal(4, context.Locations.Count());
            Assert.Equal(1, context.Locations.Count( l => l.Moniker == "newLocation"));
        }

        [Fact]
        public void AddProductTest() {
            var context = CreateDbContext();
            var repo = new InventoryRepository(context);

            Assert.Equal(7, context.Products.Count());
            repo.AddProduct(new Product()
            {
                Name = "newProduct",
            });
            Assert.Equal(true, repo.Save());
            Assert.Equal(8, context.Products.Count());
            Assert.Equal(1, context.Products.Count(p => p.Name == "newProduct"));
        }
    }
}
