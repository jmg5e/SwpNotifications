using System.Net.Http;
using Newtonsoft.Json;
using SwpNotifications.Api.models;
using Xunit;

namespace SwpNotifications.Api.Tests.Controllers {


    public class AuthControllerTests : IClassFixture<TestApplicationFactory<Startup>> {

        public TestApplicationFactory<Startup> _factory { get; }

        public AuthControllerTests(TestApplicationFactory<Startup> factory) {
            _factory = factory;
        }

        [Fact]
        public async void TokenRequestWithValidCredentials() {
            var client = _factory.CreateClient();
            UserCredentials validCredentials = new UserCredentials()
            {
                userName = "user",
                password = "Passw0rd!"
            };
            var response = await client.PostAsJsonAsync("/api/auth/token", validCredentials);
            response.EnsureSuccessStatusCode(); // Status Code 200-299

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<LoginResponse>(stringResponse);

            Assert.Equal("user", result.userName);
            Assert.NotNull(result.accessToken);
            Assert.NotNull(result.refreshToken);
        }

        [Fact]
        public async void TokenRequestWithInValidPassword() {
            var client = _factory.CreateClient();
            UserCredentials validCredentials = new UserCredentials()
            {
                userName = "user",
                password = "badPassword!"

            };
            var response = await client.PostAsJsonAsync("/api/auth/token", validCredentials);

            Assert.Equal(400, (int)response.StatusCode);
        }
    }
}
