using BibCorpPrevenir2.Application.Dtos.Emprestimos;
using BibCorpPrevenir2.Application.Dtos.Patrimonios;
using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Services.Contracts.Patrimonios
{
    public interface IPatrimonioService
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
