import { Component, inject } from "@angular/core";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { Paginacao, ResultadoPaginado } from "../../../util/class";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AcervoService } from "../../../services/acervo";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent {
  #acervoService = inject(AcervoService);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public acervos: Acervo[] = [];
  public acervosRecentes: Acervo[] = [];
  public acervosLidos: Acervo[] = [];


  public generos: String[] = [];

  public opcaoPesquisa: string = "Todos";
  public opcaoGeneroRecentes: string = "Todos";
  public argumento: string = "";

  public filtroAcervo(): void {
    this.getAcervosRecentes();
  }

  public ngOnInit(): void {
    this.getAcervosRecentes();
    this.getAcervos();
  }

  public getAcervosRecentes(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervosRecentes(
        1,
        8,
        this.argumento,
        this.opcaoPesquisa,
        this.opcaoGeneroRecentes
      )
      .subscribe({
        next: (retorno: ResultadoPaginado<Acervo[]>) => {
          this.acervosRecentes = retorno.resultado;
        },
        error: (error: any) => {
          console.log("aqui 2");
          this.#toastrService.error("Erro ao carregar Acervos", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getAcervos(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervos()
      .subscribe({
        next: (retorno: Acervo[]) => {
          this.acervos = retorno;

          for (var acervo of this.acervos) this.generos.push(acervo.genero);

          this.generos = this.generos.filter(
            (genero, i) => this.generos.indexOf(genero) === i
          );

          this.acervosLidos = retorno;
        },
        error: (error: any) => {
          console.log("aqui 2");
          this.#toastrService.error("Erro ao carregar Acervos", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public detalheAcervo(acervoId: number): void {
    this.#router.navigate([`pages/acervos/detalhe/${acervoId}`]);
  }

  public showDetailsButton: number | null = null;

  favoritarAcervo(acervoId: number): void {
    // Lógica de favoritar aqui
    console.log("Livro favoritado:", acervoId);
  }
}
