
using BibCorpPrevenir.Domain.Models.Acervos;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir.Persistence.Util.Pages.Class;

namespace BibCorpPrevenir.Persistence.Interfaces.Contracts.Acervos
{
  public interface IAcervoPersistence : ISharedPersistence
  {
    Task<IEnumerable<Acervo>> GetAllAcervosAsync();
    Task<Acervo> GetAcervoByIdAsync(int acervoId);
    Task<Acervo> GetAcervoByISBNAsync(string ISBN);
    Task<ListaDePaginas<Acervo>> GetAcervosRecentesAsync(ParametrosPaginacao parametrosPaginacao);
    Task<ListaDePaginas<Acervo>> GetAcervosPaginacaoAsync(ParametrosPaginacao parametrosPaginacao);
    Task<bool> UpdateAcervoAposEmprestimo(int acervoId);
    Task<bool> UpdateAcervoAposDevolucaoOuRecusa(int acervoId);
  }
}
