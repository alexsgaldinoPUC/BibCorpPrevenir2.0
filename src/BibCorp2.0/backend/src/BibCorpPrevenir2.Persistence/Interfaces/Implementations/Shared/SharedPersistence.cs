using BibCorpPrevenir2.Persistence.Contexts;
using BibCorpPrevenir2.Persistence.Interfaces.Contracts.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Persistence.Interfaces.Implementations.Shared
{
    public class SharedPersistence : ISharedPersistence
    {
        private readonly BibCorpPrevenir2Context _context;
        public SharedPersistence(BibCorpPrevenir2Context context)
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
