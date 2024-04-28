using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Models.Emprestimos
{
    public class EmprestimoFiltro
    {
        public required DateTime DataInicio { get; set; }
        public required DateTime DataFim { get; set; }
        public required List<string> Usuarios { get; set; }
        public List<EmprestimoStatus>? Status { get; set; }
    }
}
