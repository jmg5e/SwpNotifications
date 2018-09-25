using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SwpNotifications.Data.Services;
using Xunit;

namespace SwpNotifications.Data.Tests {
    public class RequestRepositoryTests {
        private static AppDbContext CreateDbContext() {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString());

            var context = new AppDbContext(builder.Options);
            context.SeedDataForTests();

            return context;
        }

        [Fact]
        public void GetRequestsTest() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            var result = repo.GetProductRequests();

            Assert.Equal(context.Requests, result);
            Assert.Equal(1, result.Count());
        }

        [Fact]
        public void GetRequestByProductIdShouldReturnRequest() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            var result = repo.GetRequestByProductId(context.Products.FirstOrDefault().Id);
            Assert.NotNull(result);
            Assert.Equal(context.Requests.FirstOrDefault(), result);
        }

        [Fact]
        public void RequestExistsWithProductIsTrue() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            var result = repo.RequestExistsWithProductId(context.Products.FirstOrDefault().Id);
            Assert.True(result);
        }

        [Fact]
        public void RequestExistsWithProductIsFalse() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            var result = repo.RequestExistsWithProductId(-1);
            Assert.False(result);
        }

        [Fact]
        public void DeleteProductRequestTest() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            repo.DeleteProductRequest(context.Requests.FirstOrDefault());
            Assert.True(repo.Save());
            Assert.Equal(0, context.Requests.Count());
        }

        [Fact]
        public void DeleteAllRequestsTest() {
            var context = CreateDbContext();
            var repo = new RequestRepository(context);

            repo.DeleteAllProductRequests();
            Assert.True(repo.Save());
            Assert.Equal(0, context.Requests.Count());
        }
    }
}
