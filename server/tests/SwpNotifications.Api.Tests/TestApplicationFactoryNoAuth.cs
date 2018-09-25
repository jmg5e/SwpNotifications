using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SwpNotifications.Data;
using SwpNotifications.Data.Services;

namespace SwpNotifications.Api.Tests {
    public class TestApplicationFactoryNoAuth<TStartup>
        : WebApplicationFactory<Startup> {
        protected override void ConfigureWebHost(IWebHostBuilder builder) {
            builder.UseEnvironment("Testing");

            base.ConfigureWebHost(builder);
            builder.ConfigureServices(services => {
                services.AddMvc(opts => { opts.Filters.Add(new AllowAnonymousFilter()); });
    // Create a new service provider.
                var serviceProvider = new ServiceCollection()
                    .AddEntityFrameworkInMemoryDatabase()
                    .BuildServiceProvider();

                // Add a database context (ApplicationDbContext) using an in-memory 
                // database for testing.
                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                    options.UseInternalServiceProvider(serviceProvider);
                });

                // Build the service provider.
                var sp = services.BuildServiceProvider();

                // Create a scope to obtain a reference to the database
                // context (ApplicationDbContext).
                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<AppDbContext>();
                    var loggerFactory = scopedServices.GetRequiredService<ILoggerFactory>();

                    var logger = scopedServices
                        .GetRequiredService<ILogger<TestApplicationFactoryNoAuth<TStartup>>>();

                    // Ensure the database is created.
                    // db.Database.EnsureDeleted();
                    // db.Database.EnsureCreated();

                    try
                    {

                        // Seed the database with test data.
                        // CatalogContextSeed.SeedAsync(db, loggerFactory).Wait();
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, $"An error occurred seeding the " +
                            "database with test messages. Error: {ex.Message}");
                    }
                }
            });
            // builder.ConfigureServices(services => {
            //     // Create a new service provider.
            //     var serviceProvider = new ServiceCollection()
            //     .AddEntityFrameworkInMemoryDatabase()
            //     .BuildServiceProvider();
            //     //
            //     services.AddDbContext<AppDbContext>(options => {
            //         options.UseInMemoryDatabase(Guid.NewGuid().ToString());
            //         options.UseInternalServiceProvider(serviceProvider);
            //     });
            //
            //     services.AddMvc(opts => { opts.Filters.Add(new AllowAnonymousFilter()); });
            //     // Build the service provider.
            //     var sp = services.BuildServiceProvider();
            //     //
            //     // // Create a scope to obtain a reference to the database
            //     // // context (ApplicationDbContext).
            //     // using (var scope = sp.CreateScope()) {
            //     //     var scopedServices = scope.ServiceProvider;
            //     //
            //     //     var db = scopedServices.GetRequiredService<AppDbContext>();
            //     //     var logger = scopedServices
            //     //         .GetRequiredService<ILogger<TestApplicationFactoryNoAuth<TStartup>>>();
            //     //
            //     //     // db.Database.EnsureCreated();
            //     //     // try {
            //     //     //     db.SeedDataForTests();
            //     //     // } catch (Exception ex) {
            //     //     //     logger.LogError(ex, $"Error Seeding TestData: {ex.Message}");
            //     //     // }
            //     // }
            // });
        }
    }
}
