using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Domain.Models.Patrimonios;
using BibCorpPrevenir.Domain.Models.Usuarios;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace BibCorpPrevenir.Persistence.Interfaces.Contexts
{
    public class BibCorpPrevenirContext : IdentityDbContext<Usuario, Papel, int, IdentityUserClaim<int>, UsuarioPapel, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>

    {
        public BibCorpPrevenirContext(DbContextOptions<BibCorpPrevenirContext> options) : base(options) { }
        public DbSet<Patrimonio> Patrimonios { get; set; }
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
        }
    }

}