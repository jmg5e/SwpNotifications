using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SwpNotifications.Data.Services {
    public interface IDbInitializer {
        Task InitializeDbAsync(bool reset = false);
        Task EnsureAdminAccountCreatedAsync(IConfiguration configuration);
        Task SeedDataAsync(); 
    }
}
