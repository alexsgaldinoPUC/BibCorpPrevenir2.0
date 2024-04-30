import { Component, inject } from "@angular/core";
import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { Paginacao, ResultadoPaginado } from "../../../util/class";
import { Router } from "@angular/router";
import { PatrimonioService } from "../../../services/patrimonio/patrimonio.service";
import { ModalDeleteComponent } from "../../../shared";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-patrimonio-lista",
  templateUrl: "./patrimonio-lista.component.html",
  styleUrl: "./patrimonio-lista.component.scss",
})
export class PatrimonioListaComponent {
  #dialog = inject(MatDialog);
  #formBuilder = inject(FormBuilder)
  #patrimonioService = inject(PatrimonioService);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public formPatrimonioLista = {} as FormGroup;

  // public animal!: string;
  // public name!: string;

  public patrimonios: Patrimonio[] = [];
  public patrimonio!: Patrimonio;
  // public PatrimonioFiltrados: any = [];

  public paginacao = {} as Paginacao;

  public patrimonioId = 0;
  public patrimonioISBN = "";

   public exibirImagem: boolean = true;

  public capaLivro =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvSXCxMVWmCqcYHAvsrPZXmy2OkBeGy1-fbuCX2yfV5duFlE84Bk7C_APCxidn5u9cE0&usqp=CAU";

  filtroPatrimonio() {
     console.log("Filtro");
     this.getPatrimonios();
  }

  public get ctrF(): any {
    return this.formPatrimonioLista.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.getPatrimonios();
  }

  private validation(): void {
    this.formPatrimonioLista = this.#formBuilder.group({
      opcaoPesquisa: ["Todos"],
      argumento: [""]
    });
  }

  public alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getPatrimonios(): void {
    this.#spinnerService.show();
  console.log(this.ctrF.opcaoPesquisa.value, this.ctrF.argumento.value)
    this.#patrimonioService
      .getPatrimoniosPaginacao(
        this.paginacao.paginaCorrente,
        this.paginacao.itensPorPagina,
        this.ctrF.argumento.value,
        this.ctrF.opcaoPesquisa.value
      )
      .subscribe({
        next: (retorno: ResultadoPaginado<Patrimonio[]>) => {
          this.patrimonios = retorno.resultado;
          this.paginacao = retorno.paginacao;
          console.log(this.patrimonios);
        },
        error: (error: any) => {
          console.log("aqui 2");
          this.#toastrService.error("Erro ao carregar Patrimônios", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public abrirModal(
    event: any,
    patrimonioId: number,
    patrimonioISBN: string
  ): void {
    event.stopPropagation();
    this.patrimonioId = patrimonioId;
    this.patrimonioISBN = patrimonioISBN;

    this.#patrimonioService.getPatrimonioById(patrimonioId).subscribe({
      next: (patrimonio: Patrimonio) => {
        this.patrimonio = patrimonio;
        if (this.patrimonio.acervoId === null) {
          const dialogRef = this.#dialog.open(ModalDeleteComponent, {
            data: {
              nomePagina: "Patrimônios",
              id: this.patrimonioId,
              argumento: this.patrimonioISBN,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed", result);
            if (result) this.confirmarDelecao();
          });
        } else {
          this.#toastrService.info(
            "Este patrimônio está associado à um acervo e não pode ser excluído!",
            "Informação!"
          );
        }
      },
    });
  }

  public confirmarDelecao(): void {
    this.#spinnerService.show();

    this.#patrimonioService
      .deletePatrimonio(this.patrimonioId)
      .subscribe({
        next: (result: any) => {
          if (result == null)
            this.#toastrService.error(
              "Patrimonio não pode se excluído.",
              "Erro!"
            );
          if (result.message == "OK") {
            this.#toastrService.success(
              "Patrimonio excluído com sucesso",
              "Excluído!"
            );
            this.getPatrimonios();
          }
        },
        error: (error: any) => {
          this.#toastrService.error(
            error.error,
            `Erro! Status ${error.status}`
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.show());
  }

  public editarPatrimonio(_patrimonioId: number): void {
    this.#router.navigate([`pages/patrimonios/detalhe/${_patrimonioId}`]);
  }

  public alteracaoDePagina(event: any): void {
    //    this.pagination.currentPage = event.currentPage
    this.getPatrimonios();
  }
}
