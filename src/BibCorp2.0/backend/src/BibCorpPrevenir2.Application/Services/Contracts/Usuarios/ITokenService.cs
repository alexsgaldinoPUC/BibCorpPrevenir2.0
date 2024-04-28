using BibCorpPrevenir2.Application.Dtos.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Services.Contracts.Usuarios
{
    public interface ITokenService
    {
        Task<string> CreateToken(UsuarioUpdateDto usuarioUpdateDto);
    }
}
