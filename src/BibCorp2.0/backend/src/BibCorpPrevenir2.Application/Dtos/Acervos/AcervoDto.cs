﻿using BibCorpPrevenir2.Application.Dtos.Patrimonios;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Dtos.Acervos
{
    public class AcervoDto
    {
        public int Id { get; set; }
        public required string ISBN { get; set; }
        [Display(Name = "Título do Acervo"),
          Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? Titulo { get; set; }
        public string? SubTitulo { get; set; }
        [Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? Autor { get; set; }
        [Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? Resumo { get; set; }
        [Display(Name = "Ano de Publicação"),
        Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? AnoPublicacao { get; set; }
        [Display(Name = "Nome da Editora"),
        Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? Editora { get; set; }
        [Display(Name = "Data de Criação / Cadastro do livro"),
        Required(ErrorMessage = "Campo {0} deverá ser informado no formato AAAAMMDD!")]
        public string? DataCriacao { get; set; }
        public string? Edicao { get; set; }
        [Display(Name = "Gênero"),
        Required(ErrorMessage = "Campo {0} deverá ser informado!")]
        public string? Genero { get; set; }
        public int QtdPaginas { get; set; }
        public string? Comentarios { get; set; }
        public string? CapaUrl { get; set; }
        public int QtdeDisponivel { get; set; }
        public int QtdeEmTransito { get; set; }
        public int QtdeEmprestada { get; set; }
        public IEnumerable<PatrimonioDto>? Patrimonios { get; set; }
    }
}
