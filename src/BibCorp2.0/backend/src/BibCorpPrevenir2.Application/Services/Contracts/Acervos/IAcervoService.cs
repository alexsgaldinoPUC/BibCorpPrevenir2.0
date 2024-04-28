using BibCorpPrevenir2.Application.Dtos.Acervos;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Services.Contracts.Acervos
{
    public interface IAcervoService
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
