using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SwpNotifications.Data;

namespace SwpNotifications.Api.Tests {
    public class TestApplicationFactory<TStartup>
        : WebApplicationFactory<Startup> {
        protected override void ConfigureWebHost(IWebHostBuilder builder) {

            builder.UseEnvironment("Testing");
            base.ConfigureWebHost(builder);
            // builder.ConfigureServices(services => {
            //     // Create a new service provider.
            //     var serviceProvider = new ServiceCollection()
            //     .BuildServiceProvider();
            //
            //     services.AddDbContext<AppDbContext>();
            //     // services.AddDbContext<AppDbContext>(
            //     // options => 
            //     // {
            //     //         options.UseInMemoryDatabase("InMemoryDbForTesting");
            //     //         options.UseInternalServiceProvider(serviceProvider);
            //     // });
            //
            //     var sp = services.BuildServiceProvider();
            //
            //     // Create a scope to obtain a reference to the database
            //     // context (ApplicationDbContext).
            //     using (var scope = sp.CreateScope()) {
            //         var scopedServices = scope.ServiceProvider;
            //
            //         var db = scopedServices.GetRequiredService<AppDbContext>();
            //         var logger = scopedServices
            //             .GetRequiredService<ILogger<TestApplicationFactory<TStartup>>>();
            //
            //         db.Database.EnsureCreated();
            //         try {
            //             db.SeedDataForTests();
            //         } catch (Exception ex) {
            //             logger.LogError(ex, $"Error Seeding TestData: {ex.Message}");
            //         }
            //     }
            // });
        }
    }
}
