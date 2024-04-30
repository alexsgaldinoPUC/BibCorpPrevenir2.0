using BibCorpPrevenir2.Application.Services.Contracts.Acervos;
using BibCorpPrevenir2.Application.Services.Contracts.Emprestimos;
using BibCorpPrevenir2.Application.Services.Contracts.Patrimonios;
using BibCorpPrevenir2.Application.Services.Contracts.Usuarios;
using BibCorpPrevenir2.Application.Services.Implements.Acervos;
using BibCorpPrevenir2.Application.Services.Implements.Emprestimos;
using BibCorpPrevenir2.api.Util.Services.Interfaces.Contracts.Uploads;
using BibCorpPrevenir2.Application.Services.Implements.Patrimonios;
using BibCorpPrevenir2.Application.Services.Implements.Usuarios;
using BibCorpPrevenir2.api.Util.Services.Interfaces.Implementations.Uploads;
using BibCorpPrevenir2.Domain.Models.Usuarios;
using BibCorpPrevenir2.Persistence.Configuration.Classes;
using BibCorpPrevenir2.Persistence.Contexts;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Acervos;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Emprestimos;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Patrimonios;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Usuarios;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Acervos;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Patrimonios;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Shared;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Emprestimos;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Usuarios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.OpenApi.Models;
using System.Reflection;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Injeção do DBCONTEXT no projeto
builder.Services
    .AddDbContext<BibCorpPrevenir2Context>(
        context =>
        {
            var configuration = builder.Configuration.GetConnectionString("DefaultConnection");
            context.UseMySql(configuration, ServerVersion.AutoDetect(configuration));
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
    .AddEntityFrameworkStores<BibCorpPrevenir2Context>()
    .AddDefaultTokenProviders();

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

//Injeção das controllers
builder.Services
    .AddControllers()
    // Já leva os enum convertidos na query
    .AddJsonOptions(options => {
//        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); trocado para nova tecnologia
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    })
    // Eliminar loop infinito da estrutura
    .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//InjeÇão do mapeamento automático de campos (DTO)
builder.Services
    .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Injeção dos serviços de persistencias
builder.Services
.AddScoped<IAcervoService, AcervoService>()
    .AddScoped<IEmprestimoService, EmprestimoService>()
    .AddScoped<IPatrimonioService, PatrimonioService>()
    .AddScoped<ITokenService, TokenService>()
    .AddScoped<IUsuarioService, UsuarioService>()
    .AddScoped<IUploadService, UploadService>();

//Injeção das interfaces de Persistencias
builder.Services
    .AddScoped<IAcervoPersistence, AcervoPersistence>()
    .AddScoped<IEmprestimoPersistence, EmprestimoPersistence>()
    .AddScoped<IPatrimonioPersistence, PatrimonioPersistence>()
    .AddScoped<IUsuarioPersistence, UsuarioPersistence>()
    .AddScoped<ISharedPersistence, SharedPersistence>();

builder.Services
    .AddCors();

builder.Services
    .Configure<PersistenceConfiguration>(x =>
    {
        x.PrazoRenovacao = Convert.ToInt32(builder.Configuration["prazoRenovacao"]);
    });

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
}

app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BibCorpPrevenir.API v1"));

app.UseHttpsRedirection();

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

app.MapControllers();

app.Run();
