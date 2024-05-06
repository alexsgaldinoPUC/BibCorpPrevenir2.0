import { Component, Inject, OnInit, inject } from "@angular/core";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { EmprestimoService } from "../../../services/emprestimo";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from "../../../services/usuario";
import { EmprestimoModalAlteracaoComponent } from "../emprestimo-modal-alteracao";

@Component({
  selector: "app-emprestimo-modal-local",
  templateUrl: "./emprestimo-modal-local.component.html",
  styleUrls: ["./emprestimo-modal-local.component.scss"],
})
export class EmprestimoModalLocalComponent {
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #emprestimoService = inject(EmprestimoService);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public emprestimoIdParam: any = "";
  public novoLocalColeta = "";
  public localColetaAtual = "";

  public emprestimo = {} as Emprestimo;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataInput: { emprestimoId: number; localDeColetaAtual: string }
  ) {}

  ngOnInit(): void {
    this.emprestimoIdParam = this.dataInput.emprestimoId;
    this.localColetaAtual = this.dataInput.localDeColetaAtual;
  }

  fecharModalAlterarEAbrirModalSucesso() {
    const dialogRefAlterar = this.dataInput.emprestimoId;
    if (dialogRefAlterar) {
      this.#dialog.closeAll();
    }

    this.#dialog.open(EmprestimoModalAlteracaoComponent, {
      data: { emprestimoId: this.emprestimoIdParam },
      id: "Sucesso",
    });
  }

  public alterarLocalDeColeta(): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .alterarLocalDeColeta(this.emprestimoIdParam, this.novoLocalColeta)
      .subscribe({
        next: () => this.fecharModalAlterarEAbrirModalSucesso(),
        error: (error: any) => {
          if (
            error.status === 400 &&
            error.error ==
              "Não é possível alterar o local de coleta de um empréstimo já devolvido"
          ) {
            this.#toastrService.error(
              "Não será possível realizar a alteração solicitada pois o empréstimo já foi devolvido"
            );
          } else if (error.status === 500) {
            this.#toastrService.error(
              "Ocorreu um erro ao tentar alterar o local de coleta"
            );
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
