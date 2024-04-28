using BibCorpPrevenir2.Domain.Models.Emprestimos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Usuarios
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? Localizacao { get; set; }
        public string? FotoURL { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string UserName { get; set; }
        public required string PhoneNumber { get; set; }
        public IEnumerable<Emprestimo>? Emprestimos { get; set; }
    }
}
