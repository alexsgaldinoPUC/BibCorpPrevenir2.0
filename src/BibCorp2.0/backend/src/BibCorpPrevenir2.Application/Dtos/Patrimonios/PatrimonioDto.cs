using BibCorpPrevenir2.Domain.Enums.Patrimonios;
using BibCorpPrevenir2.Domain.Models.Acervos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Patrimonios
{
    public class PatrimonioDto
    {
        public int Id { get; set; }
        [Display(Name = "Localização do Patrimônio")]
        public string? Localizacao { get; set; }
        [Display(Name = "Código da Sala")]
        public string? Sala { get; set; }
        [Display(Name = "Código da Coluna")]
        public string? Coluna { get; set; }
        [Display(Name = "Código da Prateleira")]
        public string? Prateleira { get; set; }
        [Display(Name = "Posição")]
        public string? Posicao { get; set; }
        public required string ISBN { get; set; }
        public PatrimonioStatus Status { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public string? DataIndisponibilidade { get; set; }
        public int? AcervoId { get; set; }
        public Acervo? Acervo { get; set; }
    }
}
