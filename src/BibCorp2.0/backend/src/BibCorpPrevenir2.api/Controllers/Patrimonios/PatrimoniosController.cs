using BibCorpPrevenir2.api.Util.Extensions.Pages;
using BibCorpPrevenir2.api.Util.Extensions.Security;
using BibCorpPrevenir2.Application.Dtos.Patrimonios;
using BibCorpPrevenir2.Application.Services.Contracts.Acervos;
using BibCorpPrevenir2.Application.Services.Contracts.Patrimonios;
using BibCorpPrevenir2.Application.Services.Contracts.Usuarios;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibCorpPrevenir2.api.Controllers.Patrimonios;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PatrimoniosController : ControllerBase
{
    private readonly IAcervoService _acervoService;
    private readonly IPatrimonioService _patrimonioService;
    private readonly IUsuarioService _usuarioService;

    public PatrimoniosController
    (
        IAcervoService aervoService,
        IPatrimonioService patrimonioService,
        IUsuarioService usuarioService
    )
    {
        _acervoService = aervoService;
        _patrimonioService = patrimonioService;
        _usuarioService = usuarioService;
    }


    /// <summary>
    /// Obtém os dados de todos os patrimônios cadastrados na empresa
    /// </summary>
    /// <response code="200">Dados dos patrimônios cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet]
    public async Task<IActionResult> GetAllPatrimonios()
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var patrimonios = await _patrimonioService.GetAllPatrimoniosAsync();

            if (patrimonios == null) return NotFound("Não existem patrimônios cadastrados");

            return Ok(patrimonios);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar patrimônios. Erro: {e.Message}");
        }
    }
    /// <summary>
    /// Obtém os dados de todos os patrimônios que possuem o mesmo ISBN
    /// </summary>
    /// <param name="isbn">Identificador do Acervo no Patrimônio</param>
    /// <response code="200">Dados dos patrimônios cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("{isbn}/ISBN")]
    public async Task<IActionResult> GetAllPatrimoniosByISBN(string isbn)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var patrimonios = await _patrimonioService.GetPatrimoniosByISBNAsync(isbn);

            if (patrimonios == null) return NotFound("Não existem patrimônios cadastrados para este ISBN");

            return Ok(patrimonios);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar patrimônios. Erro: {e.Message}");
        }
    }
    /// <summary>
    /// Obtém os dados de todos os patrimônios que não estão associados a um acervo a partir de um ISBN
    /// </summary>
    /// <param name="isbn">Identificador do Acervo no Patrimônio</param>
    /// <response code="200">Dados dos patrimônios cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("Livres/{isbn}")]
    public async Task<IActionResult> GetAllPatrimoniosLivres(string isbn)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var patrimonios = await _patrimonioService.GetAllPatrimoniosLivresAsync(isbn);

            if (patrimonios == null) return NotFound("Não existem patrimônios cadastrados para este ISBN");

            return Ok(patrimonios);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar patrimônios. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Obtém os dados de um patrimônio específico
    /// </summary>
    /// <param name="patrimonioId">Identificador do patrimônio</param>
    /// <response code="200">Dados do patrimônio consultado</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("{patrimonioId}")]
    public async Task<IActionResult> GetPatrimonioById(int patrimonioId)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var patrimonio = await _patrimonioService.GetPatrimonioByIdAsync(patrimonioId);

            if (patrimonio == null) return NotFound("Não existe patrimônio cadastrado para o Id informado");

            return Ok(patrimonio);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar patrimônio por Id. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a inclusão de um novo patrimônio
    /// </summary>
    /// <response code="200">Patrimônio cadastrado com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpPost]
    public async Task<IActionResult> CreatePatrimonio(PatrimonioDto patrimonioDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (!usuario.IsAdmin)
            {
                return Unauthorized();
            }

            Console.WriteLine("ISBNA: " + patrimonioDto.ISBN);
            var acervo = await _acervoService.GetAcervoByISBNAsync(patrimonioDto.ISBN);

            if (acervo != null)
            {
                patrimonioDto.AcervoId = acervo.Id;
                acervo.QtdeDisponivel += 1;

                var acervoAlterado = await _acervoService.UpdateAcervo(acervo.Id, acervo);

                if (acervoAlterado != null) BadRequest("Ocorreu um erro ao tentar atualizar o acervo ao incluir o patrimônio");
            }

            var createdPatrimonio = await _patrimonioService.CreatePatrimonio(patrimonioDto);

            if (createdPatrimonio != null) return Ok(createdPatrimonio);

            return BadRequest("Ocorreu um erro ao tentar incluir o patrimônio");
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar patrimonio. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a atualização dos dados de um patrimônio
    /// </summary>
    /// <param name="patrimonioId">Identificador do patrimônio</param>
    /// <param name="patrimonioDto">Patrimônio Cadastrado</param>
    /// <response code="200">Patrimônio atualizado com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpPut("{patrimonioId}")]
    public async Task<IActionResult> UpdateAcervo(int patrimonioId, PatrimonioDto patrimonioDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (!usuario.IsAdmin)
            {
                return Unauthorized();
            }

            var patrimonio = await _patrimonioService.UpdatePatrimonio(patrimonioId, patrimonioDto);

            if (patrimonio == null) return NotFound("Não existe patrimônio cadastrado para o Id informado");

            return Ok(patrimonio);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar patrimonio. Erro: {e.Message}");
        }
    }

    /// <summary>
    /// Realiza a exclusão de um patrimônio
    /// </summary>
    /// <param name="patrimonioId">Identificador do patrimônio</param>
    /// <response code="200">Patrimônio excluído com sucesso</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpDelete("{patrimonioId}")]
    public async Task<IActionResult> DeletePatrimonio(int patrimonioId)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            if (!usuario.IsAdmin)
            {
                return Unauthorized();
            }

            if (await _patrimonioService.DeletePatrimonio(patrimonioId))
            {
                return Ok(new { message = "OK" });
            }
            else
            {
                return BadRequest("Ocorreu um erro ao tentar excluir o patrimônio");
            }
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir patrimônio. Erro: {e.Message}");
        }
    }


    /// <summary>
    /// Obtém os dados dos patrimonios cadastrados na emrpesa com recurso de paginacao
    /// </summary>
    /// <response code="200">Dados dos patrimonios cadastrados</response>
    /// <response code="400">Parâmetros incorretos</response>
    /// <response code="500">Erro interno</response>

    [HttpGet("Paginacao")]
    public async Task<IActionResult> GetPatrimoniosPaginacao([FromQuery] ParametrosPaginacao parametrosPaginacao)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(User.GetUserNameClaim());

            if (usuario == null)
            {
                return Unauthorized();
            }

            var patrimonios = await _patrimonioService.GetPatrimoniosPaginacaoAsync(parametrosPaginacao);

            if (patrimonios == null) return NotFound("Não existem patrimonios cadastrados");

            Response.IncluirPaginacao(patrimonios.PaginaCorrente, patrimonios.TamanhoDaPagina, patrimonios.ContadorTotal, patrimonios.TotalDePaginas);

            return Ok(patrimonios);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar acervos. Erro: {e.Message}");
        }
    }
}
