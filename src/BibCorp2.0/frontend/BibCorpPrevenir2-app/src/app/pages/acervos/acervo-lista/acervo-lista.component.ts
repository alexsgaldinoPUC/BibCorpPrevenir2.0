import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AcervoService } from "../../../services/acervo";
import { Paginacao, ResultadoPaginado } from "../../../util/class";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UsuarioService } from "../../../services/usuario";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { ModalDeleteComponent } from "../../../shared";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-acervo-lista",
  templateUrl: "./acervo-lista.component.html",
  styleUrl: "./acervo-lista.component.scss",
})
export class AcervoListaComponent {
  #acervoService = inject(AcervoService);
  #dialog = inject(MatDialog);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public formAcervoLista = {} as FormGroup;

  public acervos = [] as Acervo[];
  public acervo = {} as Acervo;

  public paginacao = {} as Paginacao;

  public acervoId = 0;
  public acervoISBN = "";
  public acervoAlocado = false;

  public exibirImagem: boolean = true;
  public usuarioAdmin = false;

  public get ctrF(): any {
    return this.formAcervoLista.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.getUserName();
    this.getAcervos();
  }

  private validation(): void {
    this.formAcervoLista = this.#formBuilder.group({
      opcaoPesquisa: ["Todos"],
      argumento: [""],
    });
  }

  public getUserName(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuario: Usuario) => {
          if (usuario.userName === "Admin") this.usuarioAdmin = true;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Usuário", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getAcervos(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervosPaginacao(
        this.paginacao.paginaCorrente,
        this.paginacao.itensPorPagina,
        this.ctrF.argumento,
        this.ctrF.opcaoPesquisa
      )
      .subscribe({
        next: (retorno: ResultadoPaginado<Acervo[]>) => {
          this.acervos = retorno.resultado;
          this.paginacao = retorno.paginacao;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Acervos", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public abrirModal(event: any, acervoId: number, acervoISBN: string): void {
    event.stopPropagation();

    this.acervoId = acervoId;
    this.acervoISBN = acervoISBN;

    this.validarAcervo(this.acervoId);
  }

  public confirmarDelecao(): void {
    this.#spinnerService.show();

    this.#acervoService
      .deleteAcervo(this.acervoId)
      .subscribe({
        next: (result: any) => {
          if (result == null)
            this.#toastrService.error("Acervo não pode se excluído.", "Erro!");

          if (result.message == "OK") {
            this.#toastrService.success(
              "Acervo excluído com sucesso",
              "Excluído!"
            );
            this.getAcervos();
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
      .add(() => this.#spinnerService.hide());
  }

  public validarAcervo(acervoId: number): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoById(acervoId)
      .subscribe({
        next: (acervo: Acervo) => {
          this.acervo = acervo;
          if (this.acervo.qtdeEmTransito + this.acervo.qtdeEmprestada > 0)
            this.acervoAlocado = true;

          if (!this.acervoAlocado) {
            const dialogRef = this.#dialog.open(ModalDeleteComponent, {
              data: {
                nomePagina: "Acervos",
                id: this.acervoId,
                argumento: this.acervoISBN,
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              if (result) this.confirmarDelecao();
            });
          } else {
            this.#toastrService.info(
              "Este livro está alocado em um empréstimo",
              "Informação!"
            );
          }
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Falha ao recuperar Acervo",
            `Erro! Status ${error.status}`
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public editarAcervo(acervoId: number): void {
    this.#router.navigate([`pages/acervos/editar/${acervoId}`]);
  }

  public detalheAcervo(event: any, acervoId: number): void {
    event.stopPropagation();

    this.#router.navigate([`pages/acervos/detalhe/${acervoId}`], { skipLocationChange: false});
  }

  public alteracaoDePagina(event: any): void {
     this.paginacao.paginaCorrente = event.currentPage
     this.getAcervos();
  }
}
