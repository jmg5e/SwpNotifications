using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using SwpNotifications.Data;
using Xunit;

namespace SwpNotifications.Api.Tests.Controllers {

    public class LocationsEndPoint : IClassFixture<TestApplicationFactory<Startup>> {

        // public TestApplicationFactoryNoAuth<Startup> _factory { get; }
        private TestApplicationFactory<Startup> _factory { get; }
        private readonly HttpClient client;

        public LocationsEndPoint(TestApplicationFactory<Startup> factory) {
            // _factory = factory;
            client = factory.CreateClient();
        }

        [Fact]
        public async void Get_LocationsReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/locations");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<LocationDto>>(stringResponse).ToList();

            Assert.Equal(2, result.Count());
            Assert.Equal(1, result.Count(l => l.Moniker == "Loc1"));
            Assert.Equal(1, result.Count(l => l.Moniker == "Loc2"));
        }

        [Fact]
        public async void Get_LocationsIncludeProductsReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/locations?includeProducts=true");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<LocationWithProductsDto>>(stringResponse).ToList();

            Assert.Equal(2, result.Count());
            Assert.Equal(1, result.Count(l => l.Moniker == "Loc1" && l.Products.Count == 2));
            Assert.Equal(1, result.Count(l => l.Moniker == "Loc2" && l.Products.Count == 3));
        }

        [Fact]
        public async void Get_LocationReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/locations/1");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<LocationWithProductsDto>(stringResponse);

            Assert.Equal("Loc1", result.Moniker);
            Assert.Equal(2, result.Products.Count);
        }

        [Fact]
        public async void Get_LocationReturnsNotFound() {
            var response = await client.GetAsync("/api/locations/3");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async void Get_LocationWithoutProductsReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/locations/1?includeProducts=false");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<LocationDto>(stringResponse);

            Assert.Equal("Loc1", result.Moniker);
        }
    }
}
