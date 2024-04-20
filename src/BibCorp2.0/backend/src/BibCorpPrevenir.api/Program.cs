using System.Text;
using BibCorpPrevenir.Domain.Models.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using BibCorpPrevenir.Application.Services.Contracts.Acervos;
using BibCorpPrevenir.Application.Services.Packages.Acervos;
using BibCorpPrevenir.Application.Services.Contracts.Emprestimos;
using BibCorpPrevenir.Application.Services.Packages.Emprestimos;
using BibCorpPrevenir.Application.Services.Contracts.Patrimonios;
using BibCorpPrevenir.Application.Services.Packages.Patrimonios;
using BibCorpPrevenir.Application.Services.Contracts.Usuarios;
using BibCorpPrevenir.Application.Services.Packages.Usuarios;
using BibCorpPrevenir.API.Controllers.Uploads;
using BibCorp.API.Controllers.Uploads;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Acervos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Emprestimos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Acervos;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Packages.Shared;
using BibCorpPrevenir.Config;
using System.Reflection;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
                // Já leva os enum convertidos na query
                .AddJsonOptions(options =>
                 {
                     options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                     options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                 })
                 .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
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

// Injeção do DBCONTEXT no projeto
builder.Services
  .AddDbContext<BibCorpPrevenirContext>(
    context =>
    {
        context.UseMySql(
            builder.Configuration.GetConnectionString("DefaultConnection"), 
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")),
            options => options.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: System.TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null)
            );
        context.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    }
);

// Injeção Identity
builder.Services
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

//InjeÇão do mapeamento automático de campos (DTO)
builder.Services
    .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Injeção dos serviços de persistencias
builder.Services
    .AddScoped<IAcervoServices, AcervoServices>()
    .AddScoped<IEmprestimoServices, EmprestimoServices>()
    .AddScoped<IPatrimonioServices, PatrimonioServices>()
    .AddScoped<ITokenServices, TokenServices>()
    .AddScoped<IUsuarioServices, UsuarioServices>()
    .AddScoped<IUploadService, UploadService>();

//Injeção das interfaces de Persistencias
builder.Services
    .AddScoped<IAcervoPersistence, AcervoPersistence>()
    .AddScoped<IEmprestimoPersistence, EmprestimoPersistence>()
    .AddScoped<IPatrimonioPersistence, PatrimonioPersistence>()
    .AddScoped<IUsuarioPersistence, UsuarioPersistence>()
    .AddScoped<ISharedPersistence, SharedPersistence>();

builder.Services.AddCors();

builder.Services.Configure<PersistenceConfiguration>(x =>
        {
            x.PrazoRenovacao = Convert.ToInt32(builder.Configuration["prazoRenovacao"]);
        });

//Injeção de autenticação
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
}

app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BibCorpPrevenir.API v1"));

//app.UseHttpsRedirection();

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

//app.UseHttpsRedirection();

app.MapControllers();

app.Run();

