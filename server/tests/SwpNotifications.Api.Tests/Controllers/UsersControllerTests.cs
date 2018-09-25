using System.Net.Http;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace SwpNotifications.Api.Tests.Controllers {

    public class UsersControllerTests : IClassFixture<TestApplicationFactoryNoAuth<Startup>> {
        private TestApplicationFactoryNoAuth<Startup> _factory { get; }
        private readonly HttpClient client;

        public UsersControllerTests(TestApplicationFactoryNoAuth<Startup> factory) {
            // _factory = factory;
            client = factory.CreateClient();
        }

        [Fact]
        public async void Get_UserReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/users");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<UserDto>>(stringResponse).ToList();

            Assert.Equal(2, result.Count());
            // Assert.Equal(1, result.Count(l => l.UserName == "Admin"));
            // Assert.Equal(1, result.Count(l => l.UserName == "User"));
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }
    }
}
