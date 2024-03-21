using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Application.Dtos.Patrimonios;
using BibCorpPrevenir.Persistence.Util.Pages.Class;

namespace BibCorpPrevenir.Application.Services.Contracts.Patrimonios
{
    public interface IPatrimonioServices
    {
    Task<IEnumerable<PatrimonioDto>> GetAllPatrimoniosAsync();
    Task<PatrimonioDto> GetPatrimonioByIdAsync(int patrimonioId);
    Task<IEnumerable<PatrimonioDto>> GetPatrimoniosByISBNAsync(string ISBN);
    Task<PatrimonioDto> CreatePatrimonio(PatrimonioDto patrimonioDto);
    Task<PatrimonioDto> UpdatePatrimonio(int patrimonioId, PatrimonioDto patrimonioDto);
    Task<bool> DeletePatrimonio(int patrimonioId);
    Task<ListaDePaginas<PatrimonioDto>> GetPatrimoniosPaginacaoAsync(ParametrosPaginacao parametrosPaginacao);
    Task<IEnumerable<PatrimonioDto>> GetAllPatrimoniosLivresAsync(string isbn);
    }
}