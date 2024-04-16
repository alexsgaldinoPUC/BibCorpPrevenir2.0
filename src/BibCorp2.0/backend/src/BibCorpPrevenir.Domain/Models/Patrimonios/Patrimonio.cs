
using BibCorpPrevenir.Domain.Enums.Patrimonio;
using BibCorpPrevenir.Domain.Models.Acervos;

namespace BibCorpPrevenir.Domain.Models.Patrimonios
{
    public class Patrimonio
    {
        public int Id { get; set; }
        public string Localizacao { get; set; }
        public string Sala { get; set; }
        public string Coluna { get; set; }
        public string Prateleira { get; set; }
        public string Posicao { get; set; }
        public string ISBN { get; set; }
        public PatrimonioStatus Status { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public string DataIndisponibilidade { get; set; }
        public int? AcervoId { get; set; }
        public Acervo Acervo { get; set; }
    }
}