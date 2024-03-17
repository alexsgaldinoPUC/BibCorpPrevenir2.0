using System.Reflection;
using BibCorpPrevenir.Persistence.Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BibCorpPrevenir.API
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

            // Injeção do DBCONTEXT no projeto
            services
              .AddDbContext<BibCorpPrevenirContext>(
                context =>
                {
                    context.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
                    context.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                }
            );

            services.AddControllers();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "BibCorpPrevenir.API", Version = "v1", Description = "API responsável por implementar as funcionalidades de backend da biblioteca corporativa da empresa Prevenir" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BibCorpPrevenir.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(cors =>
                cors.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    );

            app.UseHttpsRedirection();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}