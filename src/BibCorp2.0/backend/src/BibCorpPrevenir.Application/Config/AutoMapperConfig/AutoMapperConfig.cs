using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BibCorpPrevenir.Application.Dtos.Acervos;
using BibCorpPrevenir.Application.Dtos.Emprestimos;
using BibCorpPrevenir.Application.Dtos.Patrimonios;
using BibCorpPrevenir.Application.Dtos.Usuarios;
using BibCorpPrevenir.Domain.Models.Acervos;
using BibCorpPrevenir.Domain.Models.Emprestimos;
using BibCorpPrevenir.Domain.Models.Patrimonios;
using BibCorpPrevenir.Domain.Models.Usuarios;

namespace BibCorpPrevenir.Application.Config.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Acervo, AcervoDto>().ReverseMap();

            CreateMap<Patrimonio, PatrimonioDto>().ReverseMap();

            CreateMap<Usuario, UsuarioDto>().ReverseMap();
            CreateMap<Usuario, UsuarioLoginDto>().ReverseMap();
            CreateMap<Usuario, UsuarioUpdateDto>().ReverseMap();

            CreateMap<Emprestimo, EmprestimoDto>().ReverseMap();
            CreateMap<FiltroEmprestimo, FiltroEmprestimoDto>().ReverseMap();

        }
    }
}