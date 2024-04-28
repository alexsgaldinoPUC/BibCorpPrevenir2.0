using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using BibCorpPrevenir2.Domain.Models.Usuarios;
using BibCorpPrevenir2.Domain.Models.Acervos;
using BibCorpPrevenir2.Domain.Models.Patrimonios;
using BibCorpPrevenir2.Domain.Models.Emprestimos;

namespace BibCorpPrevenir2.Persistence.Contexts
{
    public class BibCorpPrevenir2Context : IdentityDbContext<Usuario, Papel, int, IdentityUserClaim<int>, UsuarioPapel, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public BibCorpPrevenir2Context(DbContextOptions<BibCorpPrevenir2Context> options) : base(options) { }
        public DbSet<Acervo> Acervos { get; set; }
        public DbSet<Patrimonio> Patrimonios { get; set; }
        public DbSet<Emprestimo> Emprestimos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Identity Framework Core
            modelBuilder.Entity<UsuarioPapel>(
            usuarioPapel =>
            {
                usuarioPapel.HasKey(cf => new { cf.UserId, cf.RoleId });

                usuarioPapel.HasOne(cf => cf.Papel)
                            .WithMany(f => f.UsuariosPapeis)
                            .HasForeignKey(cf => cf.RoleId)
                            .IsRequired();

                usuarioPapel.HasOne(cf => cf.Usuario)
                            .WithMany(f => f.UsuariosPapeis)
                            .HasForeignKey(cf => cf.UserId)
                            .IsRequired();
            });

            // Patrimonios
            modelBuilder.Entity<Patrimonio>(patrimonio =>
            {
                patrimonio.HasIndex(p => p.ISBN);
            });

            // Empréstimos
            modelBuilder.Entity<Emprestimo>(emprestimo =>
            {
                emprestimo.HasIndex(e => e.AcervoId);

                emprestimo.HasIndex(e => e.PatrimonioId);

                emprestimo.HasIndex(e => e.UserName);
            });

            // Acervos
            modelBuilder.Entity<Acervo>(acervo =>
            {
                acervo.HasIndex(a => a.ISBN);
            });
        }
    }
}
