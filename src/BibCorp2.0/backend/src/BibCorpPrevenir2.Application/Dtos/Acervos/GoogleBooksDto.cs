using BibCorpPrevenir2.Application.Dtos.Patrimonios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Acervos
{
    public class GoogleBooksDto
    {
        public int Id { get; set; }
        public int PatrimonioId { get; set; }
        public string ISBN { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Resumo { get; set; }
        public string AnoPublicacao { get; set; }
        public string Editora { get; set; }
        public string Edicao { get; set; }
        public string CapaUrl { get; set; }
        public int QtdeDisponivel { get; set; }
        public int QtdeEmTransito { get; set; }
        public int QtdeEmprestada { get; set; }
        public IEnumerable<PatrimonioDto> Patrimonios { get; set; }
    }
}
