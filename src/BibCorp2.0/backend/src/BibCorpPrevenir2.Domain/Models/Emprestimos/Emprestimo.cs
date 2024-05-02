using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using BibCorpPrevenir2.Domain.Models.Acervos;
using BibCorpPrevenir2.Domain.Models.Patrimonios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Models.Emprestimos
{
    public class Emprestimo
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public EmprestimoStatus Status { get; set; }
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataPrevistaDevolucao { get; set; }
        public int QtdeDiasEmprestimo { get; set; }
        public DateTime? DataDevolucao { get; set; }
        public int QtdeDiasAtraso { get; set; }
        public int AcervoId { get; set; }
        public Acervo? Acervo { get; set; }
        public int PatrimonioId { get; set; }
        public Patrimonio? Patrimonios { get; set; }
        public string? LocalDeColeta { get; set; }
        public string? LocalDeEntrega { get; set; }
        public EmprestimoAcao Acao { get; set; }
    }
}
