﻿using BibCorpPrevenir2.api.Util.Extensions.Security;
using BibCorpPrevenir2.Application.Dtos.Usuarios;
using BibCorpPrevenir2.Application.Services.Contracts.Usuarios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibCorpPrevenir2.api.Controllers.Usuarios;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;
    private readonly ITokenService _tokenService;

    public UsuariosController(
      IUsuarioService usuarioServices,
      ITokenService tokenServices)
    {
        _tokenService = tokenServices;
        _usuarioService = usuarioServices;
    }

    [AllowAnonymous]
    [HttpGet("GetUserName")]
    public async Task<IActionResult> GetUsuarioByUserName()
    {
        try
        {
            Console.WriteLine("Cheguei aqui");
            var claimUserName = User.GetUserNameClaim();
            Console.WriteLine(claimUserName);
            if (claimUserName == null)
            {
                Console.WriteLine("UserName is null");
                return Unauthorized();
            }

            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(claimUserName);

            if (usuario == null) return NoContent();

            return Ok(usuario);
        }
        catch (Exception e)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar conta. Erro: {e.Message}");
        }
    }

    [HttpGet("GetUsuarios")]
    public async Task<IActionResult> GetUsuarios()
    {
        try
        {
            var claimUserName = User.GetUserNameClaim();

            if (claimUserName == null) return Unauthorized();

            var usuarios = await _usuarioService.GetAllUsuariosAsync();

            if (usuarios == null) return NoContent();

            return Ok(usuarios);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar conta. Erro: {ex.Message}");
        }
    }

    [HttpGet("GetUsuario/{id}")]
    public async Task<IActionResult> GetUsuarioById(int id)
    {
        try
        {
            var claimUsuario = await _usuarioService.GetUsuarioByIdAsync(User.GetUserIdClaim());

            if (claimUsuario == null) return Unauthorized();

            var usuario = await _usuarioService.GetUsuarioByIdAsync(id);

            if (usuario == null) return Unauthorized();

            return Ok(usuario);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar conta. Erro: {ex.Message}");
        }
    }

    [HttpGet("GetUsuario/{nome}/nome")]
    public async Task<IActionResult> GetUsuarioByNome(string nome)
    {
        try
        {
            var claimUserName = User.GetUserNameClaim();

            if (claimUserName == null) return Unauthorized();

            var usuarios = await _usuarioService.GetAllUsuariosByNomeAsync(nome);

            if (usuarios == null) return NoContent();

            return Ok(usuarios);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar nomes. Erro: {ex.Message}");
        }
    }

    [HttpPost("CreateUsuario")]
    [AllowAnonymous]
    public async Task<IActionResult> CreateUsuario(UsuarioDto usuarioDto)
    {
        try
        {
            if (await _usuarioService.VerificarUsuarioExisteAsync(usuarioDto.UserName))
            {
                return BadRequest("Conta já cadastrada!");
            }

            var usuario = await _usuarioService.CreateUsuario(usuarioDto);

            if (usuario != null)
            {
                return Ok(new
                {
                    userName = usuario.UserName,
                    nome = usuario.Nome,
                    id = usuario.Id,
                    token = _tokenService.CreateToken(usuario).Result
                });
            };

            return BadRequest("Conta não cadastrada!");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao cadastrar conta. Erro: {e.Message}");
        }
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<IActionResult> Login(UsuarioLoginDto usuarioLoginDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByUserNameAsync(usuarioLoginDto.UserName);

            if (usuario == null) return Unauthorized("Conta não cadastrada");

            var validacaoUsuario = await _usuarioService.CompararSenhaUsuarioAsync(usuario, usuarioLoginDto.Password);

            if (!validacaoUsuario.Succeeded)
            {
                return Unauthorized("Conta ou Senha inválidos");
            }

            return Ok(new
            {
                userName = usuario.UserName,
                nome = usuario.Nome,
                id = usuario.Id,
                token = _tokenService.CreateToken(usuario).Result
            });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao realizar Login. Erro: {e.Message}");
        }
    }

    [HttpPut("UpdateUsuario")]
    public async Task<IActionResult> UpdateUsuario(UsuarioUpdateDto usuarioUpdateDto)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByIdAsync(User.GetUserIdClaim());

            if (usuario == null) return Unauthorized();

            var usuarioUdpdated = await _usuarioService.UpdateUsuario(usuarioUpdateDto);

            if (usuario == null) return NoContent();

            return Ok(new
            {
                userName = usuario.UserName,
                nome = usuario.Nome,
                id = usuario.Id,
                token = _tokenService.CreateToken(usuarioUdpdated).Result
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar atualizar conta. Erro: {ex.Message}");
        }
    }
}
