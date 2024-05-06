import { Component, OnInit, inject } from "@angular/core";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EmprestimoService } from "../../../services/emprestimo";
import { UsuarioService } from "../../../services/usuario";
import { DateAdapter } from "@angular/material/core";
import {
  Emprestimo,
  FiltroEmprestimo,
} from "../../../shared/models/interfaces/emprestimo";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-historico",
  templateUrl: "./historico.component.html",
  styleUrls: ["./historico.component.scss"],
})
export class HistoricoComponent {
  #router = inject(Router);
  #dialog = inject(MatDialog);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #emprestimoService = inject(EmprestimoService);
  #usuarioService = inject(UsuarioService);
  #dateAdapter = inject(DateAdapter);

  public filtroEmprestimo = {} as FiltroEmprestimo;

  public emprestimos = [] as Emprestimo[];
  public usuarios = [] as Usuario[];

  public usuario: string[] = [];

  //   public paginacao = {} as Paginacao;

  public dataInicio = {} as Date;
  public dataFim = {} as Date;
  //   selectedUser: string;
  //   selectedSituaco: Status;

  public exibirImagem: boolean = true;
  public showUserDropdown: boolean = false;
  public showStatusDropdown: boolean = false;

  public status: string[] = [];

  public selectedUsers: { [key: string]: boolean } = {};
  public selectedStatus: { [key: string]: boolean } = {};

  constructor() {
    this.#dateAdapter.setLocale("pt-br");
  }

  ngOnInit(): void {
    this.getAllEmprestimos();
    this.getAllUsuarios();
    this.obterSituacoes();
  }

  public alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  public toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  onUserOptionChange() {
    // Lógica adicional, se necessário
  }

  public getAllEmprestimos(): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .getAllEmprestimos()
      .subscribe({
        next: (retorno: Emprestimo[]) => {
          this.emprestimos = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao buscar os empréstimos", "Erro!");
          console.error(error);
        },
      })

      .add(() => this.#spinnerService.hide());
  }

  public getEmprestimosFiltrados(
    dataInicio: Date,
    dataFim: Date,
    selectedUsers: { [key: string]: boolean } = {},
    selectedStatus: { [key: string]: boolean } = {}
  ): void {
    this.#spinnerService.show();

    let usuarioParametro: any = "";
    let listaDeUsuarios: any = "";
    let statusParametro: any = "";
    let listaDeStatus: any = "";

    Object.keys(selectedUsers).forEach((user) => {
      usuarioParametro = `&Usuarios=${user}`;
      listaDeUsuarios += usuarioParametro;
    });

    Object.keys(selectedStatus).forEach((status) => {
      statusParametro = `&Status=${status}`;
      listaDeStatus += statusParametro;
    });

    this.filtroEmprestimo.dataInicio = formatDate(
      dataInicio,
      "YYYY-MM-dd",
      "en-US"
    );
    this.filtroEmprestimo.dataFim = formatDate(dataFim, "YYYY-MM-dd", "en-US");
    this.filtroEmprestimo.usuarios = listaDeUsuarios;
    this.filtroEmprestimo.status = listaDeStatus;

    this.#emprestimoService
      .getEmprestimosFiltrados(this.filtroEmprestimo)
      .subscribe({
        next: (retorno: Emprestimo[]) => {
          this.emprestimos = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Erro ao buscar os empréstimos filtrados",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getAllUsuarios(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getAllUsuarios()
      .subscribe({
        next: (retorno: Usuario[]) => {
          this.usuarios = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao buscar os usuários", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public obterSituacoes(): void {
    this.status = [
      "Reservado",
      "Emprestado",
      "Devolvido",
      "Renovado",
      "Recusado",
    ];
  }

  public formatarData(data: Date): any {
    if (data != null) {
      return formatDate(data, "dd/MM/YYYY", "en-US");
    } else {
      return null;
    }
  }

  public obterStatus(emprestimo: Emprestimo): any {
    let dataAtual = new Date();
    let dataPrevistaDevolucao = emprestimo.dataPrevistaDevolucao;

    if (
      dataPrevistaDevolucao < dataAtual &&
      emprestimo.dataDevolucao == null &&
      (emprestimo.status == 2 || emprestimo.status == 4)
    ) {
      return "Em atraso";
    } else if (emprestimo.status == 1) {
      return "Reservado";
    } else if (emprestimo.status == 2) {
      return "Emprestado";
    } else if (emprestimo.status == 3) {
      return "Devolvido";
    } else if (emprestimo.status == 4) {
      return "Renovado";
    } else if (emprestimo.status == 5) {
      return "Recusado";
    } else return "-";
  }
}
