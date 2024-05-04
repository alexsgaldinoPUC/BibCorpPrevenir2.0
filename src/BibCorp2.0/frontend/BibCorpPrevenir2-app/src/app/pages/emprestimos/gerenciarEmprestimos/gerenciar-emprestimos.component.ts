import { Component, inject } from "@angular/core";
import { EmprestimoService } from "../../../services/emprestimo";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from "../../../services/usuario";
import { Emprestimo, FiltroEmprestimo } from "../../../shared/models/interfaces/emprestimo";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-gerenciar-emprestimos",
  templateUrl: "./gerenciar-emprestimos.component.html",
  styleUrl: "./gerenciar-emprestimos.component.scss",
})
export class GerenciarEmprestimosComponent {
  #emprestimoService = inject(EmprestimoService);
  #formBuilder = inject(FormBuilder);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public formAdmin!: FormGroup;

  public usuariosSelected = new FormControl("");
  public usuariosList?: string | null;

  public situacaoSelected = new FormControl("");
  public situacaoList?: string | null;

  public emprestimos: Emprestimo[] = [];
  public filtroEmprestimo!: FiltroEmprestimo;
  public usuarios: Usuario[] = [];

  public exibirImagem: boolean = true;

  public status: string[] = [];

  public get ctrF(): any {
    return this.formAdmin.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.getAllEmprestimos();
    this.getAllUsuarios();
    this.obterSituacoes();
  }

  private validation(): void {
    this.formAdmin = this.#formBuilder.group({
      dataInicio: ["", Validators.required],
      dataFim: ["", Validators.required],
      situacaoSelected: [""],
      usuariosSelected: [""],
    });
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public onUserOptionChange() {
    if (this.usuariosSelected) {
      this.usuariosList = this.usuariosSelected.value;
    }
    // Lógica adicional, se necessário
  }

  public onStatusOptionChange() {
    if (this.situacaoSelected) {
      this.situacaoList = this.situacaoSelected.value;
    }

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
    selectedUsers: any,
    selectedStatus: any
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
    console.log(selectedUsers);
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
    }

    return null;
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
