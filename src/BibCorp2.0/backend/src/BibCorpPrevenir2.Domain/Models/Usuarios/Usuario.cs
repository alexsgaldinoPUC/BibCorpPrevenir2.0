using BibCorpPrevenir2.Domain.Models.Emprestimos;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Models.Usuarios
{
    public class Usuario : IdentityUser<int>
    {
        public required string Nome { get; set; }
        public string? Localizacao { get; set; }
        public string? FotoURL { get; set; }
        public IEnumerable<Emprestimo>? Emprestimos { get; set; }   
        public IEnumerable<UsuarioPapel>? UsuariosPapeis { get; set; }
    }
}
