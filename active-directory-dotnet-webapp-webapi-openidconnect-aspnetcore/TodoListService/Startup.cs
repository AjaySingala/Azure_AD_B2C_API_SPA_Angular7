using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TodoListService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            //services.AddAuthentication(sharedOptions =>
            //{
            //    sharedOptions.DefaultScheme = AzureADDefaults.BearerAuthenticationScheme;
            //})
            .AddAzureAdBearer(options => Configuration.Bind("AzureAd", options));

            services.AddCors((options =>
            {
                options.AddPolicy("AzurePolicy", builder => builder
                    .WithOrigins("http://localhost:4200",
                        "Access-Control-Allow-Origin",
                        "Access-Control-allow-Credentials")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    );
            }));
            

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AzurePolicy");
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}