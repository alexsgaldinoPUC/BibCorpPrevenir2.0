import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BcpTitleBarComponent } from '../../../shared';

@Component({
  selector: 'app-bcp-home-page',
  standalone: true,
  imports: [ BcpTitleBarComponent, CommonModule, FormsModule, MatIconModule, NgSelectModule, NgxSpinnerModule],
  templateUrl: './bcp-home-page.component.html',
  styleUrl: './bcp-home-page.component.scss'
})
export class BcpHomePageComponent {
  public acervos = []
  public acervosRecentes = []
  public acervosLidos = []
  public acervosRecentesCategoria = []

  public paginacao = []

  public generos: String[] = []

  public opcaoPesquisa: string = 'Todos'
  public opcaoGeneroRecentes: string = 'Todos'
  public argumento: string = ''

  public filtroAcervo(): void {
    this.getAcervosRecentes()
  }

  constructor (
//    private acervoService: AcervoService,
//    private toastrService: ToastrService,
//    private spinnerService: NgxSpinnerService,
    private router: Router,
  ) { }

  public ngOnInit (): void {
    this.getAcervosRecentes()
    this.getAcervos()
  }

  public getAcervosRecentes (): void {
/*    this.spinnerService.show()

    this.acervoService
    .getAcervosRecentes(1, 8, this.argumento, this.opcaoPesquisa, this.opcaoGeneroRecentes)
    .subscribe(
      (retorno: ResultadoPaginado<Acervo[]>) => {
        this.acervosRecentes = retorno.resultado
      },
      (error: any) => {
        console.log("aqui 2")
        this.toastrService.error("Erro ao carregar Acervos", 'Erro!');
        console.error(error)
      }
    )
    .add(() => this.spinnerService.hide())
    */  }

  public getAcervos(): void {
 /*   this.spinnerService.show()

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
    */  }

  public detalheAcervo(acervoId: number): void {
    this.router.navigate([`acervos/detalhe/${acervoId}`]);
  }


 showDetailsButton: number | null = null;

  favoritarAcervo(acervoId: number): void {
    // Lógica de favoritar aqui
    console.log('Livro favoritado:', acervoId);
  }
}
