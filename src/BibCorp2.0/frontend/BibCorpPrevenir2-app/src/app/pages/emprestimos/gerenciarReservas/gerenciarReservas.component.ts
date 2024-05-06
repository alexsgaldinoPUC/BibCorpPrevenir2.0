import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { NgxSpinnerService } from "ngx-spinner";
import { UsuarioService } from "../../../services/usuario";
import { ToastrService } from "ngx-toastr";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { EmprestimoService } from "../../../services/emprestimo";
import { formatDate } from "@angular/common";
import { TipoAcaoEmprestimo } from "../../../shared/models/enums/emprestimo";

@Component({
  selector: "app-gerenciarReservas",
  templateUrl: "./gerenciarReservas.component.html",
  styleUrls: ["./gerenciarReservas.component.scss"],
})
export class GerenciarReservasComponent {
  #emprestimoService = inject(EmprestimoService);
  #formBuilder = inject(FormBuilder);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public exibirImagem: boolean = true;

  public emprestimos = [] as Emprestimo[];
  // public emprestimo: Emprestimo;

  public gerenciamentoEmprestimo = {} as Emprestimo;
  // public tipoAcaoEmprestimo: TipoAcaoEmprestimo;

  public statusPendentesDeAtuacao = [] as string[];

  ngOnInit(): void {
    this.getEmprestimosPendentes();
    //   this.gerenciamentoEmprestimo = new GerenciamentoEmprestimo();
  }

  // public editarAcervo(acerovId: number): void {
  //   this.router.navigate([`acervos/edicao/${acerovId}`]);
  // }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  // public alteracaoDePagina(event: any): void {
  //   //    this.pagination.currentPage = event.currentPage
  // }

  public getEmprestimosPendentes(): void {
    this.#spinnerService.show();

    this.statusPendentesDeAtuacao = ["Reservado", "Emprestado", "Renovado"];

    this.#emprestimoService
      .getEmprestimosPendentes(this.statusPendentesDeAtuacao)
      .subscribe({
        next: (retorno: Emprestimo[]) => {
          this.emprestimos = retorno;
          console.log(this.emprestimos)
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Erro ao buscar os empréstimos pendentes de atuação",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public obterStatus(emprestimoStatus: number): any {
    if (emprestimoStatus === 1) {
      return "Aguardando aprovação";
    } else if (emprestimoStatus === 2 || emprestimoStatus === 4) {
      return "Aguardando devolução";
    } else if (emprestimoStatus === 3 || emprestimoStatus === 5) {
      return "Solicitação concluída";
    }
  }

  public formatarData(data: Date): any {
    var dataFormatada = formatDate(data, "dd/MM/YYYY", "en-US");

    return dataFormatada;
  }

  public gerenciarEmprestimo(emprestimoId: number, acao: string): void {
    this.#spinnerService.show();

    if (acao === "Aprovar") {
      console.log(this.gerenciamentoEmprestimo);
      this.gerenciamentoEmprestimo.acao = TipoAcaoEmprestimo.Aprovar;
    } else if (acao === "Recusar") {
      this.gerenciamentoEmprestimo.acao = TipoAcaoEmprestimo.Recusar;
    } else if (acao === "Devolver") {
      this.gerenciamentoEmprestimo.acao = TipoAcaoEmprestimo.Devolver;
    }

    this.#emprestimoService
      .gerenciarEmprestimo(emprestimoId, this.gerenciamentoEmprestimo)
      .subscribe({
        next: (retorno: Emprestimo) => {
          this.getEmprestimosPendentes();
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao gerenciar o empréstimo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
