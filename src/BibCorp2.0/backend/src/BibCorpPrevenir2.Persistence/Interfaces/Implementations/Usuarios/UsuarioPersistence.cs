using BibCorpPrevenir2.Domain.Models.Usuarios;
using BibCorpPrevenir2.Persistence.Contexts;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Usuarios;
using BibCorpPrevenir2.Persistence.Interfaces.Implementations.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Implementations.Usuarios
{
    public class UsuarioPersistence : SharedPersistence, IUsuarioPersistence
    {

        private readonly BibCorpPrevenir2Context _context;
        public UsuarioPersistence(BibCorpPrevenir2Context context) : base(context)
        {
            _context = context;

        }

        public async Task<IEnumerable<Usuario>> GetAllUsuariosAsync()
        {
            IQueryable<Usuario> query = _context.Users
              //      .Include(u => u.Emprestimos).ThenInclude(e => e.Patrimonio)
              .AsNoTracking()
              .OrderBy(u => u.Id);

            return await query.ToArrayAsync();
        }

        public async Task<IEnumerable<Usuario>> GetAllUsuariosByNomeAsync(string nome)
        {
            IQueryable<Usuario> query = _context.Users
              //       .Include(u => u.Emprestimos)
              //     .ThenInclude(e => e.Patrimonio)
              .AsNoTracking()
              .OrderBy(u => u.Id)
              .Where(u => u.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Usuario> GetUsuarioByIdAsync(int usuarioId)
        {
            IQueryable<Usuario> query = _context.Users
             .Include(u => u.Emprestimos)
             .AsNoTracking()
             .Where(u => u.Id == usuarioId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Usuario> GetUsuarioByUserNameAsync(string userName)

        {
            IQueryable<Usuario> query = _context.Users;

            query = query
                //          .Include(u => u.Emprestimos)
                //          .ThenInclude(e => e.Patrimonio)
                .AsNoTracking()
                .Where(c => c.UserName.ToLower() == userName.ToLower());

            return await query.SingleOrDefaultAsync();
        }
    }
}
