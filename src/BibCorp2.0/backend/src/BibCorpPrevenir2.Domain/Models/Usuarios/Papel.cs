using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Models.Usuarios
{
    public class Papel : IdentityRole<int>
    {
        public string? NomeFuncao { get; set; }
        public IEnumerable<UsuarioPapel>? UsuariosPapeis { get; set; }
    }
}
