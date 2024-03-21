using BibCorpPrevenir.Application.Dtos.Emprestimos;

namespace BibCorpPrevenir.Application.Dtos.Emprestimos
{
  public class FiltroEmprestimoDto
  {
    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }
    public List<string> Usuarios { get; set; }
    public List<TipoStatusEmprestimoDto> Status { get; set; }
  }
}
