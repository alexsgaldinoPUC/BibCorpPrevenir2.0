using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibCorpPrevenir2.Domain.Enums.Emprestimo
{
    public enum EmprestimoStatus
    {
        Reservado = 1,
        Emprestado = 2,
        Devolvido = 3,
        Renovado = 4,
        Recusado = 5
    }
}
