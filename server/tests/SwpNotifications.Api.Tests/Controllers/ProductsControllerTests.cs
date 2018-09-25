using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using Xunit;

namespace SwpNotifications.Api.Tests.Controllers {

    public class ProductsEndPointTests : IClassFixture<TestApplicationFactory<Startup>> {

        public TestApplicationFactory<Startup> _factory { get; }
        private readonly HttpClient client;

        public ProductsEndPointTests(TestApplicationFactory<Startup> factory) {
            client = factory.CreateClient();
            _factory = factory;
        }

        [Fact]
        public async void Get_ProductsReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/products");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8",
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ProductDto>>(stringResponse).ToList();

            Assert.Equal(5, result.Count());
            Assert.Equal(1, result.Count(a => a.Name == "Product1" && a.LocationId == 1));
        }

        // [Fact]
        // public async void Post_ProductsReturnsCorrectResponse() {
        //     var dto = new ProductDto() { Name="TestProduct", LocationId=1 }; 
        //     HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
        //     var response = await client.PostAsync("/api/products", payload);
        //
        //     response.EnsureSuccessStatusCode(); // Status Code 200-299
        // }
        //
        // [Fact]
        // public async void Update_ProductsReturnsCorrectResponse() {
        //     var dto = new ProductDto() { Name="Product1", LocationId=1, Slot="1z" }; 
        //     HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
        //     var response = await client.PutAsync("/api/products/1", payload);
        //
        //     response.EnsureSuccessStatusCode(); // Status Code 200-299
        // }
        //
        // [Fact]
        // public async void Delete_LocationsReturnsCorrectResponse() {
        //     var productToDelete = 2;
        //     var response = await client.DeleteAsync($"/api/products/{productToDelete}");
        //
        //     response.EnsureSuccessStatusCode(); // Status Code 200-299
        // }
    }
}
