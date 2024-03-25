using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using BibCorp.API.Controllers.Uploads;
using BibCorpPrevenir.API.Controllers.Uploads;
using BibCorpPrevenir.Application.Services.Contracts.Acervos;
using BibCorpPrevenir.Application.Services.Contracts.Emprestimos;
using BibCorpPrevenir.Application.Services.Contracts.Patrimonios;
using BibCorpPrevenir.Application.Services.Contracts.Usuarios;
using BibCorpPrevenir.Application.Services.Packages.Acervos;
using BibCorpPrevenir.Application.Services.Packages.Emprestimos;
using BibCorpPrevenir.Application.Services.Packages.Patrimonios;
using BibCorpPrevenir.Application.Services.Packages.Usuarios;
using BibCorpPrevenir.Config;
using BibCorpPrevenir.Domain.Models.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Contexts;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Acervos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Emprestimos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Acervos;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Shared;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Usuarios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

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
                    context.UseMySql(Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(Configuration.GetConnectionString("DefaultConnection")));
                    context.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                }
            );

            // Injeção Identity
            services
                .AddIdentityCore<Usuario>(options =>
                    {
                        options.Password.RequireDigit = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequiredLength = 4;
                    })
                .AddRoles<Papel>()
                .AddRoleManager<RoleManager<Papel>>()
                .AddSignInManager<SignInManager<Usuario>>()
                .AddRoleValidator<RoleValidator<Papel>>()
                .AddEntityFrameworkStores<BibCorpPrevenirContext>()
                .AddDefaultTokenProviders();

            //Injeção de autenticação
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"])),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            services
                .AddControllers()
                // Já leva os enum convertidos na query
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
                // Eliminar loop infinito da estrutura
                .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //InjeÇão do mapeamento automático de campos (DTO)
            services
                .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


            //Injeção dos serviços de persistencias
            services
                .AddScoped<IAcervoServices, AcervoServices>()
                .AddScoped<IEmprestimoServices, EmprestimoServices>()
                .AddScoped<IPatrimonioServices, PatrimonioServices>()
                .AddScoped<ITokenServices, TokenServices>()
                .AddScoped<IUsuarioServices, UsuarioServices>()
                .AddScoped<IUploadService, UploadService>();

            //Injeção das interfaces de Persistencias
            services
                .AddScoped<IAcervoPersistence, AcervoPersistence>()
                .AddScoped<IEmprestimoPersistence, EmprestimoPersistence>()
                .AddScoped<IPatrimonioPersistence, PatrimonioPersistence>()
                .AddScoped<IUsuarioPersistence, UsuarioPersistence>()
                .AddScoped<ISharedPersistence, SharedPersistence>();

            services
                .AddCors();

            services.Configure<PersistenceConfiguration>(x =>
                {
                    x.PrazoRenovacao = Convert.ToInt32(Configuration["prazoRenovacao"]);
                });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "BibCorpPrevenir.API", Version = "v1", Description = "API responsável por implementar as funcionalidades de backend da biblioteca corporativa da empresa Prevenir" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header usando Beares. Entre com 'Bearer [espaço] em seguida coloque seu token.
                                    Exemplo: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme {
                        Reference = new OpenApiReference {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
            }

            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BibCorpPrevenir.API v1"));

 //           app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(cors => cors
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            );

            //Injeção de diretivas para utilização de diretórios
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
                RequestPath = new PathString("/Resources")
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}