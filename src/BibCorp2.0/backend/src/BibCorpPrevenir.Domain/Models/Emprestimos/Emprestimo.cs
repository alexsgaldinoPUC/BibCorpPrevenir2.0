using BibCorpPrevenir.Domain.Models.Acervos;
using BibCorpPrevenir.Domain.Models.Patrimonios;

namespace BibCorpPrevenir.Domain.Models.Emprestimos
{
  public class Emprestimo
  {
    public int Id { get; set; }
    public string UserName { get; set; }
    public TipoStatusEmprestimo Status { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime DataPrevistaDevolucao { get; set; }
    public int QtdeDiasEmprestimo { get; set; }
    public DateTime? DataDevolucao { get; set; }
    public int QtdeDiasAtraso { get; set; }
    public int AcervoId { get; set; }
    public Acervo Acervo { get; set; }
    public int PatrimonioId { get; set; }
    public Patrimonio Patrimonio { get; set; }
    public string LocalDeColeta { get; set; }
    public string LocalDeEntrega { get; set; }
    public TipoAcaoEmprestimo Acao { get; set; }
  }
}
