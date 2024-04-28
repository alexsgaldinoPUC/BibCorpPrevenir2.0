using AutoMapper;
using BibCorpPrevenir2.Application.Dtos.Acervos;
using BibCorpPrevenir2.Application.Dtos.Emprestimos;
using BibCorpPrevenir2.Application.Dtos.Patrimonios;
using BibCorpPrevenir2.Application.Dtos.Usuarios;
using BibCorpPrevenir2.Domain.Models.Acervos;
using BibCorpPrevenir2.Domain.Models.Emprestimos;
using BibCorpPrevenir2.Domain.Models.Patrimonios;
using BibCorpPrevenir2.Domain.Models.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Application.Config
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
            CreateMap<EmprestimoFiltro[], EmprestimoFiltroDto>().ReverseMap();

        }
    }
}
