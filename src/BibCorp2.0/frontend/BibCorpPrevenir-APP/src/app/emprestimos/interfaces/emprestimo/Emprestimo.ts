import { Acervo } from "../../../acervos";
import { Patrimonio } from "../../../patrimonios";
import { StatusEmprestimo, TipoAcaoEmprestimo } from "../../enums";

export interface Emprestimo {
  id: number;
  userName: string;
  status: StatusEmprestimo;
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  qtdeDiasEmprestimo: number;
  dataDevolucao: Date;
  qtdeDiasAtraso: number;
  acervoId: number;
  acervo: Acervo;
  patrimonioId: number;
  patrimonio: Patrimonio;
  localDeColeta: string;
  localDeEntrega: string;
  acao: TipoAcaoEmprestimo
}
