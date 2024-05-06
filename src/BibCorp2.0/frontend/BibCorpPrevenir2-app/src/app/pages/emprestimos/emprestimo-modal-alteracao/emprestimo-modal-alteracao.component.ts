import { Component, Inject, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { EmprestimoService } from "../../../services/emprestimo";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";

@Component({
  selector: "app-emprestimo-modal-alteracao",
  templateUrl: "./emprestimo-modal-alteracao.component.html",
  styleUrls: ["./emprestimo-modal-alteracao.component.scss"],
})
export class EmprestimoModalAlteracaoComponent implements OnInit {
  #router = inject(Router);
  #emprestimoService = inject(EmprestimoService);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #dialog = inject(MatDialog);

  public emprestimoAtualizado = {} as Emprestimo;
  public novaLocalColeta: any = "";
  public emprestimoIdParam: any = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataInput: { emprestimoId: number }
  ) {}

  ngOnInit(): void {
    this.emprestimoIdParam = this.dataInput.emprestimoId;
    this.getEmprestimoById(this.emprestimoIdParam);
  }

  voltarParaMinhasSolicitacoes() {
    this.#router.navigate(["/solicitacoes"]);

    const dialogRefSucesso = this.#dialog.getDialogById("Sucesso");
    if (dialogRefSucesso) {
      dialogRefSucesso.close();
    }
  }

  public getEmprestimoById(id: number): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .getEmprestimoById(id)
      .subscribe({
        next: (retorno: Emprestimo) => {
          this.emprestimoAtualizado = retorno;
          this.novaLocalColeta = this.emprestimoAtualizado.localDeColeta;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar emprestimo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
