import { Component, OnInit, inject } from "@angular/core";

import { Paginacao, ResultadoPaginado } from "../../../shared";

import { Acervo, AcervoService } from "../../../acervos";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BcpTitleBarComponent } from '../../../shared/components/bcp-title-bar/bcp-title-bar.component';

@Component({
  selector: "app-bcp-home-page",
  standalone: true,
  imports: [BcpTitleBarComponent, FormsModule, MatIconModule, NgxSpinnerModule],
  templateUrl: "./bcp-home-page.component.html",
  styleUrl: "./bcp-home-page.component.scss",
})
export class BcpHomePageComponent implements OnInit {
  #acervoService = inject(AcervoService);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public acervos: Acervo[] = [];
  public acervosRecentes: Acervo[] = [];
  public acervosLidos: Acervo[] = [];
  public acervosRecentesCategoria: Acervo[] = [];

  public paginacao: Paginacao[] = [];

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
      .subscribe(
        (retorno: ResultadoPaginado<Acervo[]>) => {
          this.acervosRecentes = retorno.resultado;
        },
        (error: any) => {
          console.log("aqui 2");
          this.#toastrService.error("Erro ao carregar Acervos", "Erro!");
          console.error(error);
        }
      )
      .add(() => this.#spinnerService.hide());
  }

  public getAcervos(): void {
    /*  this.spinnerService.show()

    this.acervoService
    .getAcervos()
    .subscribe(
      (retorno: Acervo[]) => {
        this.acervos = retorno

        for (var acervo of this.acervos)
          this.generos.push(acervo.genero)

        this.generos = this.generos.filter((genero, i) => this.generos.indexOf(genero) === i)

        this.acervosLidos = retorno
      },
      (error: any) => {
        console.log("aqui 2")
        this.toastrService.error("Erro ao carregar Acervos", 'Erro!');
        console.error(error)
      }
    )
    .add(() => this.spinnerService.hide())
    */
  }

  public detalheAcervo(acervoId: number): void {
    this.#router.navigate([`acervos/detalhe/${acervoId}`]);
  }

  showDetailsButton: number | null = null;

  favoritarAcervo(acervoId: number): void {
    // Lógica de favoritar aqui
    console.log("Livro favoritado:", acervoId);
  }
}
