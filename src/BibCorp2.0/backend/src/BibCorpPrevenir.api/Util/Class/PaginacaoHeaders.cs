using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibCorpPrevenir.api.Util.Class
{
    public class PaginacaoHeaders
    {
        public PaginacaoHeaders(int paginaCorrente, int itensPorPagina, int totalDeItens, int totalDePaginas)
        {
            this.PaginaCorrente = paginaCorrente;
            this.ItensPorPagina = itensPorPagina;
            this.TotalDeItens = totalDeItens;
            this.TotalDePaginas = totalDePaginas;

        }
        public int PaginaCorrente { get; set; }
        public int ItensPorPagina { get; set; }
        public int TotalDeItens { get; set; }
        public int TotalDePaginas { get; set; }
    }
}