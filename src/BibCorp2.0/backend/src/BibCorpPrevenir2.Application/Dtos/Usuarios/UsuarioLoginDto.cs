using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Usuarios
{
    public class UsuarioLoginDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
