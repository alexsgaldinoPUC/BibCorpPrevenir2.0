
using BibCorpPrevenir.Domain.Models.Usuarios;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;

namespace BibCorpPrevenir.Persistence.Interfaces.Contracts.Usuarios
{
  public interface IUsuarioPersistence : ISharedPersistence
  {
    Task<IEnumerable<Usuario>> GetAllUsuariosByNomeAsync(string nome);
    Task<IEnumerable<Usuario>> GetAllUsuariosAsync();
    Task<Usuario> GetUsuarioByIdAsync(int usuarioId);
    Task<Usuario> GetUsuarioByUserNameAsync(string userName);
  }
}
