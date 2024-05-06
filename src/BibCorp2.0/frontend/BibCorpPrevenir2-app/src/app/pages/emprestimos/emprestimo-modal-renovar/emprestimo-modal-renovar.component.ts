import { Component, Inject, OnInit, inject } from "@angular/core";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { EmprestimoService } from "../../../services/emprestimo";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EmprestimoModalSucessoComponent } from "../emprestimo-modal-sucesso";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-emprestimo-modal-renovar",
  templateUrl: "./emprestimo-modal-renovar.component.html",
  styleUrls: ["./emprestimo-modal-renovar.component.scss"],
})
export class EmprestimoModalRenovarComponent implements OnInit {
  #dialog = inject(MatDialog);
  #emprestimoService = inject(EmprestimoService);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public acervoTituloParam: any = "";
  public dataPrevistaDevolucaoParam: any = "";
  public emprestimoIdParam: any = "";

  public acervo = {} as Acervo;
  public emprestimo = {} as Emprestimo;
  public patrimonio = {} as Patrimonio;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataInput: {
      emprestimoId: number;
      acervoTitulo: string;
      dataPrevistaDevolucao: String;
      id: string;
    }
  ) {}

  ngOnInit(): void {
    this.emprestimoIdParam = this.dataInput.emprestimoId;
    this.acervoTituloParam = this.dataInput.acervoTitulo;
    this.dataPrevistaDevolucaoParam = this.dataInput.dataPrevistaDevolucao;
  }

  fecharModalRenovarEAbrirModalSucesso() {
    const dialogRefAlterar = this.dataInput.id;
    if (dialogRefAlterar) {
      this.#dialog.closeAll();
    }

    this.#dialog.open(EmprestimoModalSucessoComponent, {
      data: { emprestimoId: this.emprestimoIdParam },
      id: "Sucesso",
    });
  }

  public renovarEmprestimo(): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .renovarEmprestimo(this.emprestimoIdParam)
      .subscribe({
        next: () => {
          this.fecharModalRenovarEAbrirModalSucesso();
        },
        error: (error: any) => {
          if (
            error.status === 400 &&
            error.error ==
              "Renovação não permitida pois o empréstimo já foi renovado anteriormente"
          ) {
            this.#toastrService.error(
              "Não será possível realizar a renovação solicitada pois o empréstimo já foi renovado anteriormente"
            );
          } else if (error.status === 500) {
            this.#toastrService.error(
              "Ocorreu um erro ao tentar renovar o empréstimo"
            );
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public formatarData(data: Date): any {
    var dataFormatada = formatDate(data, "dd/MM/YYYY", "en-US");

    return dataFormatada;
  }
}
