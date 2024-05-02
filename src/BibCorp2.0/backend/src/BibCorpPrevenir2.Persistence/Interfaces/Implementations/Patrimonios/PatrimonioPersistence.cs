using BibCorpPrevenir2.Domain.Models.Patrimonios;
using BibCorpPrevenir2.Persistence.Contexts;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Patrimonios;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Shared;
using BibCorpPrevenir2.Persistence.Util.Classes.Paginators;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Implementations.Patrimonios
{
    public class PatrimonioPersistence : SharedPersistence, IPatrimonioPersistence
    {
        private readonly BibCorpPrevenir2Context _context;

        public PatrimonioPersistence(BibCorpPrevenir2Context context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Patrimonio>> GetAllPatrimoniosAsync()
        {
            IQueryable<Patrimonio> query = _context.Patrimonios
              //        .Include(p => p.Acervo)
              .AsNoTracking()
              .OrderBy(p => p.Id);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Patrimonio>> GetAllPatrimoniosLivresAsync(string isbn)
        {
            IQueryable<Patrimonio> query = _context.Patrimonios
              //        .Include(p => p.Acervo)
              .AsNoTracking()
              .Where(p => p.ISBN == isbn && p.AcervoId == null)
              .OrderBy(p => p.Id);

            return await query.ToListAsync();
        }

        public async Task<Patrimonio> GetPatrimonioByIdAsync(int patrimonioId)
        {
            IQueryable<Patrimonio> query = _context.Patrimonios
              //        .Include(p => p.Acervo)
              .AsNoTracking()
              .Where(p => p.Id == patrimonioId);

#pragma warning disable CS8603 // Possible null reference return.
            return await query.FirstOrDefaultAsync();
#pragma warning restore CS8603 // Possible null reference return.
        }

        public async Task<IEnumerable<Patrimonio>> GetPatrimoniosByISBNAsync(string ISBN)
        {
            IQueryable<Patrimonio> query = _context.Patrimonios
              //        .Include(p => p.Acervo)
              .AsNoTracking()
              .Where(p => p.ISBN == ISBN)
              .OrderBy(p => p.ISBN);

            return await query.ToListAsync();
        }
        public async Task<ListaDePaginas<Patrimonio>> GetPatrimoniosPaginacaoAsync(ParametrosPaginacao parametrosPaginacao)
        {
            IQueryable<Patrimonio> query = _context.Patrimonios
              //        .Include(p => p.Acervo)
              .AsNoTracking();

            if (parametrosPaginacao.Argumento != "null")
            {
                if (parametrosPaginacao.PesquisarPor == "Localizacao")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Localizacao!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "Sala")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Sala!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "Coluna")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Coluna!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "Prateleira")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Prateleira!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "Posicao")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Posicao!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "ISBN")
                {
                    query = _context.Patrimonios
                      .Where(a => a.ISBN.ToLower().Contains(parametrosPaginacao!.Argumento!.ToLower()));
                }
                else if (parametrosPaginacao.PesquisarPor == "SituacaoEmprestado")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Status == Domain.Enums.Patrimonios.PatrimonioStatus.Emprestado &&
                            (a.Localizacao!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()) ||
                             a.Sala!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Coluna!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Prateleira!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Posicao!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.ISBN.ToLower().Contains(parametrosPaginacao.Argumento.ToLower())));
                }
                else if (parametrosPaginacao.PesquisarPor == "SituacaoLiberado")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Status == Domain.Enums.Patrimonios.PatrimonioStatus.Liberado &&
                            (a.Localizacao!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()) ||
                             a.Sala!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Coluna!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Prateleira!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.Posicao!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                             a.ISBN.ToLower().Contains(parametrosPaginacao.Argumento.ToLower())));
                }
                else
                {
                    query = _context.Patrimonios
                      .Where(a => a.Localizacao!.ToLower().Contains(parametrosPaginacao.Argumento!.ToLower()) ||
                                  a.Sala!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                                  a.Coluna!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                                  a.Prateleira!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                                  a.Posicao!.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()) ||
                                  a.ISBN.ToLower().Contains(parametrosPaginacao.Argumento.ToLower()));
                }
            }
            else
            {
                if (parametrosPaginacao.PesquisarPor == "SituacaoEmprestado")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Status == Domain.Enums.Patrimonios.PatrimonioStatus.Emprestado);
                }
                else if (parametrosPaginacao.PesquisarPor == "SituacaoLiberado")
                {
                    query = _context.Patrimonios
                      .Where(a => a.Status == Domain.Enums.Patrimonios.PatrimonioStatus.Liberado);
                }
            }

            return await ListaDePaginas<Patrimonio>.CriarPaginaAsync(query, parametrosPaginacao.NumeroDaPagina, parametrosPaginacao.tamanhoDaPagina);
        }

        public async Task<bool> UpdatePatrimonioAposEmprestimo(int patrimonioId)
        {
            var patrimonioAlterado = _context.Patrimonios
                      .AsNoTracking()
                      .FirstOrDefault(p => p.Id == patrimonioId);

            patrimonioAlterado!.Status = Domain.Enums.Patrimonios.PatrimonioStatus.Emprestado;
            patrimonioAlterado.DataIndisponibilidade = DateTime.Now.ToString("dd/MM/yyyy");
            patrimonioAlterado.DataAtualizacao = DateTime.Now;

            Update(patrimonioAlterado);

            return await SaveChangesAsync();
        }

        public async Task<bool> UpdatePatrimonioAposDevolucaoOuRecusa(int patrimonioId)
        {
            var patrimonioAlterado = _context.Patrimonios
                      .AsNoTracking()
                      .FirstOrDefault(p => p.Id == patrimonioId);

            patrimonioAlterado!.Status = Domain.Enums.Patrimonios.PatrimonioStatus.Liberado;
            patrimonioAlterado.DataIndisponibilidade = null;
            patrimonioAlterado.DataAtualizacao = DateTime.Now;

            Update(patrimonioAlterado);

            return await SaveChangesAsync();
        }
    }
}
