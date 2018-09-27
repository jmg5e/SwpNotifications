using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SwpNotifications.Api.SignalR;
using SwpNotifications.Data.Services;

namespace SwpNotifications.Api {
    public class Startup {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment env) {
            Configuration = configuration;
            Environment = env;
        }

        public void ConfigureServices(IServiceCollection services) {
            services.ConfigureCors();
            services.ConfigureAutomapper();

            services.ConfigureInMemoryDb();
            // services.ConfigureDataStore(Configuration);

            services.ConfigureIdentity();
            services.ConfigureAuth(Configuration);
            services.ConfigureLogging();

            services.AddScoped<IDbInitializer, DbInitializer>();
            services.AddScoped<IInventoryRepository, InventoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRequestRepository, RequestRepository>();
            services.AddSingleton<IClientManager, ClientManager>();

            services.AddSignalR(hubOptions => {
                hubOptions.EnableDetailedErrors = true;
                // hubOptions.KeepAliveInterval = TimeSpan.FromMinutes(1);
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });
        }

        public void Configure(IApplicationBuilder app,
                IHostingEnvironment env, IServiceProvider serviceProvider, IDbInitializer dbInitializer) {
            dbInitializer.InitializeDbAsync().Wait();
            dbInitializer.EnsureAdminAccountCreatedAsync(Configuration).Wait();

            if (!env.IsProduction()) {
                dbInitializer.SeedDataAsync().Wait();
            } else {
                app.UseHsts();
            }
            app.UseCors("CorsPolicy");
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseMvc();


            app.UseSignalR(route => {
                route.MapHub<SwpHub>("/SwpHub");
            });
        }
    }
}
