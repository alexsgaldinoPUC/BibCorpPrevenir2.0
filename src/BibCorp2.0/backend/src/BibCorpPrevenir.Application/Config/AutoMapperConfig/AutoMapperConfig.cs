using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BibCorpPrevenir.Application.Dtos.Patrimonios;
using BibCorpPrevenir.Domain.Models.Patrimonios;

namespace BibCorpPrevenir.Application.Config.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Patrimonio, PatrimonioDto>().ReverseMap();

        }
    }
}