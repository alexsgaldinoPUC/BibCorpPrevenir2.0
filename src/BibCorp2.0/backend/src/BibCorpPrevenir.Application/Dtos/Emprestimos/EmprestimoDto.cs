using BibCorpPrevenir.Application.Dtos.Acervos;
using BibCorpPrevenir.Application.Dtos.Patrimonios;

namespace BibCorpPrevenir.Application.Dtos.Emprestimos
{
  public class EmprestimoDto
  {
    public int Id { get; set; }
    public string UserName { get; set; }
    public TipoStatusEmprestimoDto Status { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime DataPrevistaDevolucao { get; set; }
    public int QtdeDiasEmprestimo { get; set; }
    public DateTime ?DataDevolucao { get; set; }
    public int QtdeDiasAtraso { get; set; }
    public int AcervoId { get; set; }
    public AcervoDto Acervo { get; set; }
    public int PatrimonioId { get; set; }
    public PatrimonioDto Patrimonio { get; set; }
    public string LocalDeColeta { get; set; }
    public string LocalDeEntrega { get; set; }
    public TipoAcaoEmprestimoDto Acao { get; set; }
  }
}
