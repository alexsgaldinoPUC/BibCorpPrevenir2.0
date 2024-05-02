using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Emprestimos
{
    public class EmprestimoFiltroDto
    {
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public List<string>? Usuarios { get; set; }
        public List<EmprestimoStatus>? Status { get; set; }
    }

}
