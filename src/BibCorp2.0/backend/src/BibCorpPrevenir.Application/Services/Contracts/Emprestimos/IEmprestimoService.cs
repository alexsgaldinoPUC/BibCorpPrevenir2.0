
using BibCorpPrevenir.Application.Dtos.Emprestimos;
using BibCorpPrevenir.Domain.Models.Emprestimos;

namespace BibCorpPrevenir.Application.Services.Contracts.Emprestimos
{
  public interface IEmprestimoServices
  {
    Task<IEnumerable<EmprestimoDto>> GetAllEmprestimosAsync();
    Task<EmprestimoDto> GetEmprestimoByIdAsync(int emprestimoId);
    Task<IEnumerable<EmprestimoDto>> GetEmprestimosByUserNameAsync(string userName);
    Task<IEnumerable<EmprestimoDto>> GetEmprestimosByAcervoIdAsync(int acervoId);
    Task<IEnumerable<EmprestimoDto>> GetEmprestimosByPatrimonioIdAsync(int patrimonioId);
    Task<EmprestimoDto> CreateEmprestimo(EmprestimoDto acervoDto);
    Task<EmprestimoDto> UpdateEmprestimo(int emprestimoId, EmprestimoDto acervoDto);
    Task<bool> DeleteEmprestimo(int emprestimoId);
    Task<EmprestimoDto> RenovarEmprestimo(int emprestimoId);
    Task<EmprestimoDto> AlterarLocalDeColeta(int emprestimoId, string novoLocalColeta);
    Task<IEnumerable<EmprestimoDto>> GetEmprestimosByStatusAsync(TipoStatusEmprestimoDto[] status);
    Task<EmprestimoDto> GerenciarEmprestimos(int emprestimoId);
    Task<IEnumerable<EmprestimoDto>> GetEmprestimosByFiltrosAsync(FiltroEmprestimoDto filtroEmprestimoDto);
  }
}
