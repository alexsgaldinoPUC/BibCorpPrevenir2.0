import { Component, inject } from "@angular/core";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { ModalEmprestarComponent } from "../../emprestimos";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AcervoService } from "../../../services/acervo";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-acervo-detalhe",
  templateUrl: "./acervo-detalhe.component.html",
  styleUrl: "./acervo-detalhe.component.scss",
})
export class AcervoDetalheComponent {
  #acervoService = inject(AcervoService);
  #activevateRouter = inject(ActivatedRoute);
  #dialogRef = inject(MatDialog);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public acervo = {} as Acervo;
  public acervoParam: any = "";
  public comentarios: string = "";

  abrirDialog() {
    this.#dialogRef.open(ModalEmprestarComponent, {
      data: {},
      id: "Emprestar",
    });
  }

  public ngOnInit(): void {
    this.acervoParam = this.#activevateRouter.snapshot.paramMap.get("id");
    this.getAcervoById();
  }

  public getAcervoById(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoById(+this.acervoParam)
      .subscribe({
        next: (retorno: Acervo) => {
          this.acervo = retorno;
          console.log(this.acervo);
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public salvarAcervo(): void {
    this.#spinnerService.show();

    this.acervo.comentarios = this.comentarios;

    this.#acervoService
      .saveAcervo(this.acervo)
      .subscribe({
        next: (retorno: Acervo) => {
          this.acervo = retorno;
          console.log(this.acervo);
          this.#toastrService.success(
            "Comentário incluído para o acervo!",
            "Salvo!"
          );
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao salvar acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
