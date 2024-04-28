using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using BibCorpPrevenir2.Domain.Models.Emprestimos;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Contracts.Emprestimos
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
        Task<IEnumerable<Emprestimo>> GetEmprestimosByStatusAsync(EmprestimoStatus[] status);
        Task<Emprestimo> GerenciarEmprestimos(int emprestimoId);
        Task<IEnumerable<Emprestimo>> GetEmprestimosByFiltrosAsync(EmprestimoFiltro filtroEmprestimo);
    }
}
