using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Usuarios
{
    public class UsuarioUpdateDto
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; } = false;
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Localização { get; set; }
        public string? FotoURL { get; set; }
        public required string UserName { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
    }
}
