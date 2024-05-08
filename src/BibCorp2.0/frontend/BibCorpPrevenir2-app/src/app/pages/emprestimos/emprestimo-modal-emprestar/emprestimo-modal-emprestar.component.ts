import { Component, Inject, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { EmprestimoModalSucessoComponent } from "../emprestimo-modal-sucesso";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { formatDate } from "@angular/common";
import { UsuarioService } from "../../../services/usuario";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { ToastrService } from "ngx-toastr";
import { EmprestimoService } from "../../../services/emprestimo";
import { AcervoService } from "../../../services/acervo";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { PatrimonioService } from "../../../services/patrimonio";

@Component({
  selector: "app-emprestimo-modal-emprestar",
  templateUrl: "./emprestimo-modal-emprestar.component.html",
})
export class EmprestimoModalEmprestarComponent {
  #acervoService = inject(AcervoService);
  #patrimonioService = inject(PatrimonioService);
  #dialog = inject(MatDialog);
  #emprestimoService = inject(EmprestimoService);
  #formBuilder = inject(FormBuilder);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public formModalSolicitacao = {} as FormGroup;

  public emprestimo = {} as Emprestimo;
  public usuarioAtivo = {} as Usuario;

  public acervoParam: any = "";
  public patrimonioParam: any = "";

  public get ctrF(): any {
    return this.formModalSolicitacao.controls;
  }
  // title = "angular-material";

  public acervo = {} as Acervo;
  public patrimonio = {} as Patrimonio;
  // public localEntrega: string;
  // public localColeta: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataInput: { patrimonioId: number; acervoId: number; id: string } ) {}

  ngOnInit(): void {
    console.log(
      "input: ",
      this.dataInput.acervoId,
      this.dataInput.patrimonioId
    );
    this.acervoParam = this.dataInput.acervoId;
    this.patrimonioParam = this.dataInput.patrimonioId;

    this.validation();
    this.getUsuarioAtivo();

    this.getAcervoById();

    this.getPatrimonioById();
  }

  private validation(): void {
    this.formModalSolicitacao = this.#formBuilder.group({
      localEnvio: ["Matriz", [Validators.required]],
      localDevolucao: ["Matriz", [Validators.required]],
    });
  }

  public fecharEmprestarAbrirSucesso() {
    const dialogRefEmprestar = this.dataInput.id;
    if (dialogRefEmprestar) {
      this.#dialog.closeAll();
    }

    this.#dialog.open(EmprestimoModalSucessoComponent, {
      data: { localEntrega: this.emprestimo.localDeEntrega },
      id: "Sucesso",
    });
  }

  public getAcervoById(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoById(+this.acervoParam)
      .subscribe({
        next: (acervo: Acervo) => {
          this.acervo = acervo;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getPatrimonioById(): void {
    this.#spinnerService.show();

    this.#patrimonioService
      .getPatrimonioById(+this.patrimonioParam)
      .subscribe({
        next: (retorno: Patrimonio) => {
          this.patrimonio = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Patrimonio", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public novoEmprestimo(): void {
    this.#spinnerService.show();

    let dataEmprestimo = new Date();
    this.emprestimo.dataEmprestimo = this.formatarData(dataEmprestimo);

    let dataPrevista = new Date();
    dataPrevista.setDate(dataPrevista.getDate() + 30);

    this.emprestimo.dataPrevistaDevolucao = this.formatarData(dataPrevista);

    let dataDevolucao = new Date("0001/01/01");
    this.emprestimo.dataDevolucao = this.formatarData(dataDevolucao);

    this.emprestimo.qtdeDiasAtraso = 0;
    this.emprestimo.qtdeDiasEmprestimo = 30;

    this.emprestimo.status = 1;

    this.emprestimo.acervoId = +this.acervoParam;
    this.emprestimo.patrimonioId = this.patrimonioParam;

    this.emprestimo.localDeColeta = this.ctrF.localDevolucao.value;
    this.emprestimo.localDeEntrega = this.ctrF.localEnvio.value;

    this.emprestimo.userName = this.usuarioAtivo.userName;

    console.log("emprestimo: ", this.emprestimo);
    this.#emprestimoService
      .createEmprestimo(this.emprestimo)
      .subscribe({
        next: () => this.fecharEmprestarAbrirSucesso(),
        error: (error: any) => {
          if (
            error.status === 400 &&
            error.error ==
              "Acervo não possui unidades disponíveis para empréstimo"
          ) {
            this.#toastrService.error(
              "O livro escolhido não possui exemplares disponíveis para empréstimo no momento"
            );
          } else {
            this.#toastrService.error(
              "Ocorreu um erro ao tentar cadastrar o empréstimo"
            );
            console.log(error);
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getUsuarioAtivo(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuario: Usuario) => {
          this.usuarioAtivo = usuario;
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Ocorreu um erro ao tentar recuperar o usuário"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public formatarData(data: Date): any {
    var dataFormatada = formatDate(data, "yyyy-MM-dd'T'HH:mm:ss", "en-US");

    return dataFormatada;
  }
}
