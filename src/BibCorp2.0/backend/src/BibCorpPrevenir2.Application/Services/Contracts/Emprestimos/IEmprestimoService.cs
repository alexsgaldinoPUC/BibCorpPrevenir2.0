using BibCorpPrevenir2.Application.Dtos.Emprestimos;
using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Services.Contracts.Emprestimos
{
    public interface IEmprestimoService
    {
        Task<IEnumerable<EmprestimoDto>> GetAllEmprestimosAsync();
        Task<EmprestimoDto> GetEmprestimoByIdAsync(int emprestimoId);
        Task<IEnumerable<EmprestimoDto>> GetEmprestimosByUserNameAsync(string userName);
        Task<IEnumerable<EmprestimoDto>> GetEmprestimosByAcervoIdAsync(int acervoId);
        Task<IEnumerable<EmprestimoDto>> GetEmprestimosByPatrimonioIdAsync(int patrimonioId);
        Task<EmprestimoDto> CreateEmprestimo(EmprestimoDto emprestimoDto);
        Task<EmprestimoDto> UpdateEmprestimo(int emprestimoId, EmprestimoDto emprestimoDto);
        Task<bool> DeleteEmprestimo(int emprestimoId);
        Task<EmprestimoDto> RenovarEmprestimo(int emprestimoId);
        Task<EmprestimoDto> AlterarLocalDeColeta(int emprestimoId, string novoLocalColeta);
        Task<IEnumerable<EmprestimoDto>> GetEmprestimosByStatusAsync(EmprestimoStatus[] status);
        Task<EmprestimoDto> GerenciarEmprestimos(int emprestimoId);
        Task<IEnumerable<EmprestimoDto>> GetEmprestimosByFiltrosAsync(EmprestimoFiltroDto emprestimoFiltroDto);
    }
}
