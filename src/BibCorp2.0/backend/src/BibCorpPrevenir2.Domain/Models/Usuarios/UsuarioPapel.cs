using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Models.Usuarios
{
    public class UsuarioPapel : IdentityUserRole<int>
    {
        public Usuario? Usuario { get; set; }
        public Papel? Papel { get; set; }
    }
}
