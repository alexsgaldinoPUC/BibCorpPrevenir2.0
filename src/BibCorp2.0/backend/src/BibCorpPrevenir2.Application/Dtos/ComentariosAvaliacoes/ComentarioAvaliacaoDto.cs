using BibCorpPrevenir2.Domain.Models.Acervos;
using BibCorpPrevenir2.Domain.Models.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.ComentariosAvaliacoes
{
    public class ComentarioAvaliacaoDto
    {
        public int Id { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Comentario { get; set; }
        public int Avaliacao { get; set; }
        public int UserId { get; set; }
        public Usuario Usuario { get; set; }
        public int AcervoId { get; set; }
        public Acervo Acervo { get; set; }

    }
}
