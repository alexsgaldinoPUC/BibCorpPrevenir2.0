using BibCorpPrevenir2.api.Util.Extensions.Pages;
using BibCorpPrevenir2.api.Util.Extensions.Security;
using BibCorpPrevenir2.Application.Dtos.Acervos;
using BibCorpPrevenir2.Application.Services.Contracts.Acervos;
using BibCorpPrevenir2.Application.Services.Contracts.Usuarios;
using BibCorpPrevenir2.Domain.Models.Usuarios;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace BibCorpPrevenir2.api.Controllers.Acervos;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AcervosController : Controller
{
    private readonly IAcervoService _acervoService;
    private readonly IUsuarioService _usuarioService;

    public AcervosController
    (
        IAcervoService acervoService,
        IUsuarioService usuarioService
    )
    {
        _acervoService = acervoService;
        _usuarioService = usuarioService;
    }


    /// <summary>
    /// Obtém os dados de todos os acervos cadastrado na empresa
    /// </summary>
    /// <response code="200">Dados dos acervos cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllAcervos()
    {
        try
        {
            var acervos = await _acervoService.GetAllAcervosAsync();

            if (acervos == null) return NotFound("Não existem acervos cadastrados");

            return Ok(acervos);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervos. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Obtém os dados de um acervo específico
    /// </summary>
    /// <param name="acervoId">Identificador do acervo</param>
    /// <response code="200">Dados do acervo consultado</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("{acervoId}")]
    public async Task<IActionResult> GetAcervoById(int acervoId)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if ( usuario == null)
            {
                return Unauthorized();
            }

            var acervo = await _acervoService.GetAcervoByIdAsync(acervoId);

            if (acervo == null) return NotFound("Não existe acervo cadastrado para o Id informado");

            return Ok(acervo);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervo por Id. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Obtém os dados dos acervos associados à um ISBN
    /// </summary>
    /// <param name="ISBN">Identificador do acervo</param>
    /// <response code="200">Dados do acervo consultado</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("{ISBN}/isbn")]
    public async Task<IActionResult> GetAcervoByISBN(string ISBN)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var acervos = await _acervoService.GetAcervoByISBNAsync(ISBN);

            return Ok(acervos);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervo por ISBN. Erro: {e.Message}");
        }
    }
    /// <summary>
    /// Realiza a inclusão de um novo acervo
    /// </summary>
    /// <response code="200">Acervo cadastrado com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpPost]
    public async Task<IActionResult> CreateAcervo(AcervoDto acervoDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (usuario.UserName != "Admin")
            {
                return Unauthorized();
            }

            var acervo = await _acervoService.GetAcervoByISBNAsync(acervoDto.ISBN);

            if (acervo != null) return BadRequest("Já existe um Acervo com o ISBN informado");

            var createdAcervo = await _acervoService.CreateAcervo(acervoDto);

            if (createdAcervo != null) return Ok(createdAcervo);

            return BadRequest("Ocorreu um erro ao tentar incluir o acervo");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar acervo. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a atualização dos dados de um acervo
    /// </summary>
    /// <param name="acervoId">Identificador do acervo</param>
    /// <param name="acervoDto">Acervo cadastrado</param>
    /// <response code="200">Acervo atualizado com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpPut("{acervoId}")]
    public async Task<IActionResult> UpdateAcervo(int acervoId, AcervoDto acervoDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (usuario.UserName != "Admin")
            {
                return Unauthorized();
            }

            var acervo = await _acervoService.UpdateAcervo(acervoId, acervoDto);

            if (acervo == null) return NotFound("Não existe acervo cadastrado para o Id informado");

            return Ok(acervo);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar acervo. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a exclusão de um acervo
    /// </summary>
    /// <param name="acervoId">Identificador do acervo</param>
    /// <response code="200">Acervo excluído com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpDelete("{acervoId}")]
    public async Task<IActionResult> DeleteAcervo(int acervoId)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (usuario.UserName != "Admin")
            {
                return Unauthorized();
            }

            if (await _acervoService.DeleteAcervo(acervoId))
            {
                return Ok(new { message = "OK" });
            }
            else
            {
                return BadRequest("Ocorreu um erro ao tentar excluir o acervo");
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir acervo. Erro: {e.Message}");
        }

    }

    /// <summary>
    /// Obtém os dados dos acervos cadastrados recentemente na emrpesa
    /// </summary>
    /// <response code="200">Dados dos acervos cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("Recentes")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAcervosRecentes([FromQuery] ParametrosPaginacao parametrosPaginacao)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var acervos = await _acervoService.GetAcervosRecentesAsync(parametrosPaginacao);

            if (acervos == null) return NotFound("Não existem acervos cadastrados");

            Response.IncluirPaginacao(acervos.PaginaCorrente, acervos.TamanhoDaPagina, acervos.ContadorTotal, acervos.TotalDePaginas);

            return Ok(acervos);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervos. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Obtém os dados dos acervos cadastrados na emrpesa
    /// </summary>
    /// <response code="200">Dados dos acervos cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("Paginacao")]
    public async Task<IActionResult> GetAcervosPaginacao([FromQuery] ParametrosPaginacao parametrosPaginacao)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var acervos = await _acervoService.GetAcervosRecentesAsync(parametrosPaginacao);

            if (acervos == null) return NotFound("Não existem acervos cadastrados");

            Response.IncluirPaginacao(acervos.PaginaCorrente, acervos.TamanhoDaPagina, acervos.ContadorTotal, acervos.TotalDePaginas);

            return Ok(acervos);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervos. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a consulta dos acervos no Google Books
    /// </summary>
    /// <param name="isbn">número ISBN</param>
    /// <response code="200">Consulta ao Google Books realizada</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("External/{isbn}/googlebooks")]
    public async Task<IActionResult> GetAcervosGoogleBooks(string isbn)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (usuario.UserName != "Admin")
            {
                return Unauthorized();
            }

            //var apikey = "AIzaSyAdqmSh-H-FC5TXVVEW0QBZaafCi7kI24E";
            var url = $"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}";

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetStringAsync(url);
                var BooksInfo = JObject.Parse(response);

                if (!BooksInfo["items"].HasValues)
                {
                    return null;
                }

                string selfLink = BooksInfo["items"][0]["selfLink"].ToString();
                response = await httpClient.GetStringAsync(selfLink);
                var googleBooksInfo = JObject.Parse(response);
                var volumeInfo = googleBooksInfo["volumeInfo"];
                string dataString = volumeInfo["publishedDate"].ToString();

                // Converter a string da data para um objeto DateTime
                DateTime dataDateTime = DateTime.ParseExact(dataString, "yyyy-MM-dd", null);

                // Extrair o ano da data
                string anoPublicacao = dataDateTime.Year.ToString();

                var acervoDto = new AcervoDto
                {
                    ISBN = volumeInfo["industryIdentifiers"]
                        .FirstOrDefault(x => x["type"].ToString() == "ISBN_13")?["identifier"].ToString(),
                    Titulo = volumeInfo["title"].ToString(),
                    SubTitulo = volumeInfo["subtitle"]?.ToString(),
                    Autor = string.Join(", ", volumeInfo["authors"]),
                    Resumo = volumeInfo["description"].ToString(),
                    AnoPublicacao = anoPublicacao,
                    Editora = volumeInfo["publisher"].ToString(),
                    QtdPaginas = int.Parse(volumeInfo["pageCount"].ToString())
                };

                return Ok(acervoDto);
            }

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"IBSN não existe no Google Books. Erro: {e.Message}");
        }
    }
}
