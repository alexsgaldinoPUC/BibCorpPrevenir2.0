
using BibCorpPrevenir.Domain.Models.Emprestimos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;

namespace BibCorpPrevenir.Persistence.Interfaces.Contracts.Emprestimos
{
  public interface IEmprestimoPersistence : ISharedPersistence
  {
    Task<IEnumerable<Emprestimo>> GetAllEmprestimosAsync();
    Task<Emprestimo> GetEmprestimoByIdAsync(int emprestimoId);
    Task<IEnumerable<Emprestimo>> GetEmprestimosByUserNameAsync(string userName);
    Task<IEnumerable<Emprestimo>> GetEmprestimosByAcervoIdAsync(int acervoId);
    Task<IEnumerable<Emprestimo>> GetEmprestimosByPatrimonioIdAsync(int patrimonioId);
    Task<Emprestimo> RenovarEmprestimo(int emprestimoId);
    Task<Emprestimo> AlterarLocalDeColeta(int emprestimoId, string novoLocalColeta);
    Task<IEnumerable<Emprestimo>> GetEmprestimosByStatusAsync(TipoStatusEmprestimo[] status);
    Task<Emprestimo> GerenciarEmprestimos(int emprestimoId);
    Task<IEnumerable<Emprestimo>> GetEmprestimosByFiltrosAsync(FiltroEmprestimo filtroEmprestimo);
  }
}
