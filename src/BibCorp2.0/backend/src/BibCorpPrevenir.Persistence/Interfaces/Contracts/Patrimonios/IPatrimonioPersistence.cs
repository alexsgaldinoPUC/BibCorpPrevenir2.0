using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Domain.Models.Patrimonios;
using BibCorpPrevenir.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir.Persistence.Util.Pages.Class;

namespace BibCorpPrevenir.Persistence.Interfaces.Contracts.Patrimonios
{
    public interface IPatrimonioPersistence : ISharedPersistence
    {
        Task<IEnumerable<Patrimonio>> GetAllPatrimoniosAsync();
        Task<Patrimonio> GetPatrimonioByIdAsync(int patrimonioId);
        Task<IEnumerable<Patrimonio>> GetPatrimoniosByISBNAsync(string isbn);
        Task<ListaDePaginas<Patrimonio>> GetPatrimoniosPaginacaoAsync(ParametrosPaginacao parametrosPaginacao);
        Task<IEnumerable<Patrimonio>> GetAllPatrimoniosLivresAsync(string isbn);
        Task<bool> UpdatePatrimonioAposEmprestimo(int patrimonioId);
        Task<bool> UpdatePatrimonioAposDevolucaoOuRecusa(int patrimonioId);
    }
}