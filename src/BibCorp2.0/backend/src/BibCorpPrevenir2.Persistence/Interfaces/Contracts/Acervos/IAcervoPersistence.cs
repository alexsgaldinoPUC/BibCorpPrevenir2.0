using BibCorpPrevenir2.Domain.Models.Acervos;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Contracts.Acervos
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
