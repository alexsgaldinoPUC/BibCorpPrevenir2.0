namespace BibCorpPrevenir2.api.Util.Classes.Pages
{
    public class PaginacaoHeaders
    {
        public PaginacaoHeaders(int paginaCorrente, int itensPorPagina, int totalDeItens, int totalDePaginas)
        {
            PaginaCorrente = paginaCorrente;
            ItensPorPagina = itensPorPagina;
            TotalDeItens = totalDeItens;
            TotalDePaginas = totalDePaginas;

        }
        public int PaginaCorrente { get; set; }
        public int ItensPorPagina { get; set; }
        public int TotalDeItens { get; set; }
        public int TotalDePaginas { get; set; }
    }
}
