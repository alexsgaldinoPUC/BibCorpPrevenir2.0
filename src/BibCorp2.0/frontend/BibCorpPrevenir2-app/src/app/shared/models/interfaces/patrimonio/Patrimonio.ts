import { Acervo } from "../acervo";


export interface Patrimonio {
  id: number;
  localizacao: string;
  sala: string;
  coluna: string;
  prateleira: string;
  posicao: string;
  isbn: string;
  status: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
  dataIndisponibilidade: string;
  acervoId: number;
  acervo: Acervo;
}
