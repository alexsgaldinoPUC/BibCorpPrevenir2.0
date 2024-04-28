﻿using BibCorpPrevenir2.api.Util.Extentions.Exceptions;
using BibCorpPrevenir2.Domain.Enums.Emprestimo;
using BibCorpPrevenir2.Domain.Models.Emprestimos;
using BibCorpPrevenir2.Persistence.Configuration.Classes;
using BibCorpPrevenir2.Persistence.Contexts;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Emprestimos;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Implementations.Emprestimos
{
    public class EmprestimoPersistence : SharedPersistence, IEmprestimoPersistence
    {
        private readonly BibCorpPrevenir2Context _context;
        private readonly PersistenceConfiguration _persistenceConfiguration;

        public EmprestimoPersistence(BibCorpPrevenir2Context context, IOptions<PersistenceConfiguration> persistenceConfiguration) : base(context)
        {
            _context = context;
            _persistenceConfiguration = persistenceConfiguration.Value;
        }
        public async Task<IEnumerable<Emprestimo>> GetAllEmprestimosAsync()
        {
            IQueryable<Emprestimo> query = _context.Emprestimos
                .Include(e => e.Acervo)
                .Include(e => e.Patrimonios)
                .AsNoTracking()
                .OrderBy(e => e.Id);

            return await query.ToListAsync();
        }

        public async Task<Emprestimo> GetEmprestimoByIdAsync(int emprestimoId)
        {
            IQueryable<Emprestimo> query = _context.Emprestimos
              .Include(e => e.Acervo)
              .Include(e => e.Patrimonios)
              .AsNoTracking()
              .Where(a => a.Id == emprestimoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Emprestimo>> GetEmprestimosByUserNameAsync(string userName)
        {
            IQueryable<Emprestimo> query = _context.Emprestimos
              .Include(e => e.Patrimonios)
              .Include(e => e.Acervo)
              .AsNoTracking()
              .Where(e => e.UserName == userName)
              .OrderBy(e => e.Id);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Emprestimo>> GetEmprestimosByAcervoIdAsync(int acervoId)
        {
            IQueryable<Emprestimo> query = _context.Emprestimos
              .Include(e => e.Patrimonios)
              .AsNoTracking()
              .Where(e => e.AcervoId == acervoId)
              .OrderBy(e => e.Id);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Emprestimo>> GetEmprestimosByPatrimonioIdAsync(int patrimonioId)
        {
            IQueryable<Emprestimo> query = _context.Emprestimos
              .Include(e => e.Patrimonios)
              .AsNoTracking()
              .Where(e => e.PatrimonioId == patrimonioId)
              .OrderBy(e => e.Id);

            return await query.ToListAsync();
        }

        public async Task<Emprestimo> RenovarEmprestimo(int emprestimoId)
        {
            var emprestimoRenovado = _context.Emprestimos
              .AsNoTracking()
              .FirstOrDefault(e => e.Id == emprestimoId);


            var dataPrevistaDevolucaoAtual = emprestimoRenovado.DataPrevistaDevolucao;
            var novaDataPrevistaDevolucao = dataPrevistaDevolucaoAtual.AddDays(_persistenceConfiguration.PrazoRenovacao);

            emprestimoRenovado.DataPrevistaDevolucao = novaDataPrevistaDevolucao;
            emprestimoRenovado.Status = Domain.Enums.Emprestimo.EmprestimoStatus.Renovado;
            emprestimoRenovado.QtdeDiasEmprestimo += _persistenceConfiguration.PrazoRenovacao;

            Update(emprestimoRenovado);

            if (await SaveChangesAsync())
            {
                return emprestimoRenovado;
            }
            else
                throw new CoreException("Não foi possível realizar a renovação do empréstimo");
        }

        public async Task<Emprestimo> AlterarLocalDeColeta(int emprestimoId, string novoLocalColeta)
        {
            var emprestimoAlterado = _context.Emprestimos
              .AsNoTracking()
              .FirstOrDefault(e => e.Id == emprestimoId);

            emprestimoAlterado.LocalDeColeta = novoLocalColeta;

            Update(emprestimoAlterado);

            if (await SaveChangesAsync())
            {
                return emprestimoAlterado;
            }
            else
                throw new CoreException("Não foi possível alterar o local de coleta");
        }

        public Task<IEnumerable<Emprestimo>> GetEmprestimosByStatusAsync(EmprestimoStatus[] status)
        {

            var emprestimosConsultados = new List<Emprestimo>();

            foreach (var tipoStatusEmprestimo in status)
            {
                IQueryable<Emprestimo> query = _context.Emprestimos
                 .Include(e => e.Acervo)
                 .Include(e => e.Patrimonios)
                 .AsNoTracking()
                 .Where(e => e.Status == tipoStatusEmprestimo)
                 .OrderBy(e => e.Id);

                emprestimosConsultados.AddRange(query);
            }
            return Task.FromResult<IEnumerable<Emprestimo>>(emprestimosConsultados);
        }

        public async Task<Emprestimo> GerenciarEmprestimos(int emprestimoId)
        {
            var emprestimoAlterado = _context.Emprestimos
              .AsNoTracking()
              .FirstOrDefault(e => e.Id == emprestimoId);

            if (emprestimoAlterado.Acao == EmprestimoAcao.Aprovar)
            {
                emprestimoAlterado.Status = EmprestimoStatus.Emprestado;
            }
            else if (emprestimoAlterado.Acao == EmprestimoAcao.Recusar)
            {
                emprestimoAlterado.Status = EmprestimoStatus.Recusado;
            }
            else if (emprestimoAlterado.Acao == EmprestimoAcao.Devolver)
            {
                emprestimoAlterado.Status = EmprestimoStatus.Devolvido;
                emprestimoAlterado.DataDevolucao = DateTime.Now;
            }

            Update(emprestimoAlterado);

            if (await SaveChangesAsync())
            {
                return emprestimoAlterado;
            }
            else
                throw new CoreException("Não foi possível efetuar o gerenciamento do empréstimo");
        }

        public async Task<IEnumerable<Emprestimo>> GetEmprestimosByFiltrosAsync(EmprestimoFiltro filtroEmprestimo)
        {
            var emprestimosConsultadosPorUsuario = new List<Emprestimo>();
            var emprestimosConsultadosPorStatus = new List<Emprestimo>();
            var emprestimosConsultadosPorUsuarioEStatus = new List<Emprestimo>();


            if (filtroEmprestimo.Usuarios.Any() && filtroEmprestimo.Status.Any())
            {

                foreach (var usuario in filtroEmprestimo.Usuarios)
                {
                    IQueryable<Emprestimo> query = _context.Emprestimos
                   .Include(e => e.Acervo)
                   .Include(e => e.Patrimonios)
                   .AsNoTracking()
                   .Where(e => ((e.DataEmprestimo.Date >= filtroEmprestimo.DataInicio.Date && e.DataEmprestimo.Date <= filtroEmprestimo.DataFim.Date) && e.UserName == usuario))
                   .OrderByDescending(e => e.DataEmprestimo);
                    emprestimosConsultadosPorUsuario.AddRange(query);
                }

                foreach (var emprestimo in emprestimosConsultadosPorUsuario)
                {
                    foreach (var status in filtroEmprestimo.Status)
                    {
                        if (emprestimo.Status == status)
                        {
                            emprestimosConsultadosPorUsuarioEStatus.Add(emprestimo);
                        }
                    }
                }

                return emprestimosConsultadosPorUsuarioEStatus;
            }
            else if (filtroEmprestimo.Usuarios.Any())
            {

                foreach (var usuario in filtroEmprestimo.Usuarios)
                {
                    IQueryable<Emprestimo> query = _context.Emprestimos
                      .Include(e => e.Acervo)
                      .Include(e => e.Patrimonios)
                      .AsNoTracking()
                      .Where(e => ((e.DataEmprestimo.Date >= filtroEmprestimo.DataInicio.Date && e.DataEmprestimo.Date <= filtroEmprestimo.DataFim.Date) && e.UserName == usuario))
                      .OrderByDescending(e => e.DataEmprestimo);

                    emprestimosConsultadosPorUsuario.AddRange(query);
                }

                return emprestimosConsultadosPorUsuario;
            }
            else if (filtroEmprestimo.Status.Any())
            {
                foreach (var status in filtroEmprestimo.Status)
                {
                    IQueryable<Emprestimo> query = _context.Emprestimos
                      .Include(e => e.Acervo)
                      .Include(e => e.Patrimonios)
                      .AsNoTracking()
                      .Where(e => ((e.DataEmprestimo.Date >= filtroEmprestimo.DataInicio.Date && e.DataEmprestimo.Date <= filtroEmprestimo.DataFim.Date) && e.Status == status))
                      .OrderByDescending(e => e.DataEmprestimo);
                    emprestimosConsultadosPorStatus.AddRange(query);
                }

                return emprestimosConsultadosPorStatus;
            }
            else
            {
                IQueryable<Emprestimo> emprestimosConsultadosPorData = _context.Emprestimos
                  .Include(e => e.Acervo)
                  .Include(e => e.Patrimonios)
                  .AsNoTracking()
                  .Where(e => (e.DataEmprestimo.Date >= filtroEmprestimo.DataInicio.Date && e.DataEmprestimo.Date <= filtroEmprestimo.DataFim.Date))
                  .OrderByDescending(e => e.DataEmprestimo);

                return await emprestimosConsultadosPorData.ToListAsync();
            }
        }
    }
}
