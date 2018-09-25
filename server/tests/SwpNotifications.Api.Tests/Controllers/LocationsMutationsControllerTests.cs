using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using Xunit;

namespace SwpNotifications.Api.Tests.Controllers {

    public class LocationsMutations : IClassFixture<TestApplicationFactoryNoAuth<Startup>> {
        private TestApplicationFactoryNoAuth<Startup> _factory { get; }
        private readonly HttpClient client;

        public LocationsMutations(TestApplicationFactoryNoAuth<Startup> factory) {
            // _factory = factory;
            client = factory.CreateClient();
        }

        [Fact]
        public async void Post_LocationsReturnsCorrectResponse() {
            var dto = new LocationDto() { Moniker="TestLoc", Floor="something" }; 
            HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/api/locations", payload);

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async void Update_LocationReturnsCorrectResponse() {
            var dto = new LocationDto() { Id=1, Moniker="loc4", Floor="Floor1" }; 
            HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await client.PutAsync("/api/locations/1", payload);

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async void Delete_LocationsReturnsCorrectResponse() {
            var locToDelete = 1;
            var response = await client.DeleteAsync($"/api/locations/{locToDelete}");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }
    }
}
