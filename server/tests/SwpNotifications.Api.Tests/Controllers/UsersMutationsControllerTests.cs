using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace SwpNotifications.Api.Tests.Controllers {

    public class UsersMutationsControllerTests : IClassFixture<TestApplicationFactoryNoAuth<Startup>> {
        private TestApplicationFactoryNoAuth<Startup> _factory { get; }
        private readonly HttpClient client;

        public UsersMutationsControllerTests(TestApplicationFactoryNoAuth<Startup> factory) {
            // _factory = factory;
            client = factory.CreateClient();
        }

        [Fact]
        public async void Post_UserReturnsCorrectResponse() {
            var newUser = new UserForCreationDto() { UserName = "newUser", Password = "Passw0rd!" };
            HttpContent payload = new StringContent(JsonConvert.SerializeObject(newUser), Encoding.UTF8, "application/json");
            var response = await client.PostAsJsonAsync("/api/users", newUser);

            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async void Update_UserReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/users");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<UserDto>>(stringResponse).ToList();
            var userToUpdate = result.FirstOrDefault();
            var dto = new UserForUpdateDto() { Password="New_Passw0rd" };

            HttpContent payload = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var updateResponse = await client.PutAsync($"/api/users/{userToUpdate.Id}", payload);

            updateResponse.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async void Delete_UserReturnsCorrectResponse() {
            var response = await client.GetAsync("/api/users");

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType.ToString());

            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<UserDto>>(stringResponse).ToList();
            var userToDelete = result.FirstOrDefault();

            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var deleteResponse = await client.DeleteAsync($"/api/users/{userToDelete.Id}");

            deleteResponse.EnsureSuccessStatusCode(); // Status Code 200-299
        }
    }
}

