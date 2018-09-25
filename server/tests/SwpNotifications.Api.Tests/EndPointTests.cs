using Xunit;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;

namespace SwpNotifications.Api.Tests {
    public class EndPointTests : IClassFixture<TestApplicationFactory<Startup>> {
        private readonly HttpClient client;

        public EndPointTests(TestApplicationFactory<Startup> factory) {
            client = factory.CreateClient();
        }

        [Theory]
        [InlineData("/api/products")]
        [InlineData("/api/locations")]
        [InlineData("/api/locations?includeProducts=true")]
        public async Task Get_EndPointsReturnsOk(string url) {
            var response = await client.GetAsync(url);

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8",
                    response.Content.Headers.ContentType.ToString());

            Assert.False(response.Headers.Contains("Server"), "Should not contain server header");
        }

        [Theory]
        [InlineData("/api/products")]
        [InlineData("/api/locations")]
        public async Task Post_EndpointsReturnUnauthorized(string url) {

            var response = await client.PostAsJsonAsync(url, new { });

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [InlineData("/api/products/2")]
        [InlineData("/api/locations/600")]
        public async Task Delete_EndpointsReturnUnauthorized(string url) {

            var response = await client.DeleteAsync(url);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [InlineData("/api/products/2")]
        [InlineData("/api/locations/600")]
        public async Task Update_EndpointsReturnUnauthorized(string url) {

            var response = await client.PutAsJsonAsync(url, new { });

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
