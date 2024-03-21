using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BibCorpPrevenir.Domain.Models.Acervos;

namespace BibCorpPrevenir.Application.Dtos.Patrimonios
{
    public class PatrimonioDto
    {
    public int Id { get; set; }
    [Display(Name = "Localização do Patrimônio")]
    public string Localizacao { get; set; }
    [Display(Name = "Código da Sala")]
    public string Sala { get; set; }
    [Display(Name = "Código da Coluna")]
    public string Coluna { get; set; }
    [Display(Name = "Código da Prateleira")]
    public string Prateleira { get; set; }
    [Display(Name = "Posição")]
    public string Posicao { get; set; }
    public string ISBN { get; set; }
    public bool Status { get; set; }
    public string DataCadastro { get; set; }
    public string DataAtualizacao { get; set; }
    public string DataIndisponibilidade { get; set; }
    public int? AcervoId { get; set; }
    public Acervo Acervo { get; set; }
    }
}