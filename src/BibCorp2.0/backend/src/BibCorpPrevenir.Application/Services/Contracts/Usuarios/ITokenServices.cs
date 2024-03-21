using BibCorpPrevenir.Application.Dtos.Usuarios;

namespace BibCorpPrevenir.Application.Services.Contracts.Usuarios
{
  public interface ITokenServices
  {
    Task<string> CreateToken(UsuarioUpdateDto usuarioUpdateDto);
  }
}
