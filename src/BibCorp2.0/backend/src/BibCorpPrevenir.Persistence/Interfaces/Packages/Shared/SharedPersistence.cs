using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Persistence.Interfaces.Contexts;

namespace BibCorpPrevenir.Persistence.Interfaces.Packages.Shared
{
    public class SharedPersistence
    {
        private readonly BibCorpPrevenirContext _context;
        public SharedPersistence(BibCorpPrevenirContext context)
        {
            _context = context;
        }
        public void Create<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            _context.RemoveRange(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return ((await _context.SaveChangesAsync()) > 0);
        }

        public void Update<T>(T entity) where T : class
        {
            //        _context.Add(entity);
            _context.Update(entity);
        }
    }
}