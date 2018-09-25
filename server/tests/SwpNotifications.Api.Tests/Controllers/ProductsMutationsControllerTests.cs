using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using Xunit;

namespace SwpNotifications.Api.Tests.Controllers {

    public class ProductsMutationTests : IClassFixture<TestApplicationFactoryNoAuth<Startup>> {

        public TestApplicationFactoryNoAuth<Startup> _factory { get; }

        public ProductsMutationTests(TestApplicationFactoryNoAuth<Startup> factory) {
            _factory = factory;
        }

        [Fact]
        public async void Update_ProductsReturnsCorrectResponse() {
            var client = _factory.CreateClient();
            var dto = new ProductDto() { Name="New Name", LocationId=1, Slot="1z" }; 
            HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await client.PutAsync("/api/products/1", payload);

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async void Delete_LocationsReturnsCorrectResponse() {
            var client = _factory.CreateClient();
            var productToDelete = 2;
            var response = await client.DeleteAsync($"/api/products/{productToDelete}");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }
    }
}
