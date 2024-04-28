﻿namespace BibCorpPrevenir2.Persistence.Util.Classes.Paginators
{
    public class ParametrosPaginacao
    {
        public const int TamanhoMaximoDaPagina = 100;
        public int NumeroDaPagina { get; set; } = 1;
        public int tamanhoDaPagina = 15;
        public int TamanhoDaPagina
        {
            get { return tamanhoDaPagina; }
            set { tamanhoDaPagina = value > TamanhoMaximoDaPagina ? TamanhoMaximoDaPagina : value; }
        }

        public string? PesquisarPor { get; set; }
        public string? Argumento { get; set; }
        public string? Genero { get; set; }
    }
}
