using System.Reflection;
using System.Text.Json.Serialization;
using BibCorpPrevenir.Application.Services.Contracts.Patrimonios;
using BibCorpPrevenir.Application.Services.Packages.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Contexts;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Patrimonios;
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

            services
                .AddControllers()

                // Já leva os enum convertidos na query
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))

                 // Eliminar loop infinito da estrutura
                 .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services
                .AddCors();

            //InjeÇão do mapeamento automático de campos (DTO)
            services
                .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //Injeção dos serviços de persistencias
            services
                .AddScoped<IPatrimonioServices, PatrimonioServices>();

            //Injeção das interfaces de Persistencias
            services
                .AddScoped<IPatrimonioPersistence, PatrimonioPersistence>();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "BibCorpPrevenir.API", Version = "v1", Description = "API responsável por implementar as funcionalidades de backend da biblioteca corporativa da empresa Prevenir" });

//                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
//                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
//                options.IncludeXmlComments(xmlPath);
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
 //           app.UseAuthorization();

            app.UseCors(cors =>
                cors.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    );


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    internal class PatrimonioService
    {
    }

    internal interface IPatrimonioService
    {
    }
}