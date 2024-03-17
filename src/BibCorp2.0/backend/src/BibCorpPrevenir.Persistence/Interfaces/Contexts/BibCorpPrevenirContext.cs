using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Domain.Models.Patrimonios;
using Microsoft.EntityFrameworkCore;


namespace BibCorpPrevenir.Persistence.Interfaces.Contexts
{
    public class BibCorpPrevenirContext : DbContext
    {
        public BibCorpPrevenirContext(DbContextOptions<BibCorpPrevenirContext> options) : base(options) { }
        public DbSet<Patrimonio> Patrimonios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Patrimonio>(patrimonio =>
              {
                  patrimonio.HasIndex(p => p.ISBN);
              });
        }
    }

}