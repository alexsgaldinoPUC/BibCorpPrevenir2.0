
using BibCorpPrevenir.Application.Dtos.Acervos;
using BibCorpPrevenir.Persistence.Util.Pages.Class;

namespace BibCorpPrevenir.Application.Services.Contracts.Acervos
{
  public interface IAcervoServices
  {
    Task<IEnumerable<AcervoDto>> GetAllAcervosAsync();
    Task<AcervoDto> GetAcervoByIdAsync(int acervoId);
    Task<AcervoDto> GetAcervoByISBNAsync(string ISBN);
    Task<AcervoDto> CreateAcervo(AcervoDto acervoDto);
    Task<AcervoDto> UpdateAcervo(int acervoId, AcervoDto acervoDto);
    Task<bool> DeleteAcervo(int acervoId);
    Task<ListaDePaginas<AcervoDto>> GetAcervosRecentesAsync(ParametrosPaginacao parametrosPaginacao);
    Task<ListaDePaginas<AcervoDto>> GetAcervosPaginacaoAsync(ParametrosPaginacao parametrosPaginacao);
  }
}
