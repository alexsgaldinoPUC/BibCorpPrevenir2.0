using BibCorpPrevenir2.Application.Dtos.Usuarios;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Services.Contracts.Usuarios
{
    public interface IUsuarioService
    {
        Task<UsuarioUpdateDto> CreateUsuario(UsuarioDto usuarioDto);
        Task<UsuarioUpdateDto> UpdateUsuario(UsuarioUpdateDto usuarioUpdateDto);
        Task<IEnumerable<UsuarioDto>> GetAllUsuariosByNomeAsync(string nome);
        Task<IEnumerable<UsuarioDto>> GetAllUsuariosAsync();
        Task<UsuarioDto> GetUsuarioByIdAsync(int usuarioId);
        Task<SignInResult> CompararSenhaUsuarioAsync(UsuarioUpdateDto usuarioUpdateDto, string password);
        Task<bool> VerificarUsuarioExisteAsync(string userName);
        Task<UsuarioUpdateDto> GetUsuarioByUserNameAsync(string userName);
    }
}
