using BibCorpPrevenir2.Domain.Models.Usuarios;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Contracts.Usuarios
{
    public interface IUsuarioPersistence : ISharedPersistence
    {
        Task<IEnumerable<Usuario>> GetAllUsuariosByNomeAsync(string nome);
        Task<IEnumerable<Usuario>> GetAllUsuariosAsync();
        Task<Usuario> GetUsuarioByIdAsync(int usuarioId);
        Task<Usuario> GetUsuarioByUserNameAsync(string userName);
    }
}
