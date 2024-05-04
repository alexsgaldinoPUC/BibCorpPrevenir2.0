import { Component, inject } from '@angular/core';
import { AcervoService } from '../../../services/acervo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Acervo } from '../../../shared/models/interfaces/acervo';
import { ResultadoPaginado } from '../../../util/class';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  #acervoService = inject(AcervoService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public formHomePage!: FormGroup;

  public acervos: Acervo[] = [];
  public acervosRecentes: Acervo[] = [];
  public acervosLidos: Acervo[] = [];

  public generos: String[] = [];
  public isFavorito = false;

  public get ctrF(): any {
    return this.formHomePage.controls;
  }

  public filtroAcervo(): void {
    this.getAcervosRecentes();
  }

  public ngOnInit(): void {
    this.validation();
    this.getAcervosRecentes();
    this.getAcervos();
  }

  private validation(): void {
    this.formHomePage = this.#formBuilder.group({
      opcaoPesquisa: ["Todos", Validators.required],
      argumento: [""],
      opcaoGeneroRecentes: ["Todos"]
    });
  }

  public getAcervosRecentes(): void {
    this.#spinnerService.show();

    // Retrona os 8 exemplares mais recentes
    this.#acervoService
      .getAcervosRecentes(
        1,
        8,
        this.ctrF.argumento.value,
        this.ctrF.opcaoPesquisa.value,
        this.ctrF.opcaoGeneroRecentes.value
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
    this.isFavorito = !this.isFavorito;
    console.log("Livro favoritado:", acervoId);
  }
}
