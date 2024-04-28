using BibCorpPrevenir2.api.Util.Classes.Pages;
using System.Text.Json;

namespace BibCorpPrevenir2.api.Util.Extensions.Pages
{
    public static class Paginacao
    {
        public static void IncluirPaginacao(this HttpResponse response, int paginaCorrente, int itensPorPagina, int toalDeItens, int totalDePaginas)
        {
            var paginacao = new PaginacaoHeaders(paginaCorrente, itensPorPagina, toalDeItens, totalDePaginas);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Append("Paginacao", JsonSerializer.Serialize(paginacao, options));

            response.Headers.Append("Access-Control-Expose-Headers", "Paginacao");
        }
    }
}
