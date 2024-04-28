using BibCorpPrevenir2.Domain.Models.Patrimonios;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Contracts.Patrimonios
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
