import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { environment } from '../../../../assets';

import { Acervo } from '../../interfaces';
import { ResultadoPaginado } from '../../../shared';

@Injectable({
  providedIn: 'root'
})
export class AcervoService {
  #http = inject(HttpClient)

  baseUrl = environment.apiURL + 'Acervos/'

  public getAcervos$(fisltrarPor?: string, TipoFiltro?: string): Observable<Acervo[]> {
    console.log(this.baseUrl)
    return this.#http.get<Acervo[]>(this.baseUrl)
      .pipe(take(3))
  }

  public getAcervosRecentes (pagina?: number, itensPorPagina?: number, argumento?: string, pesquisarPor: string = 'Todos', genero: string = 'Todos'): Observable<ResultadoPaginado<Acervo[]>> {
    console.log(this.baseUrl)
    const resultadoPaginado: ResultadoPaginado<Acervo[]> = new ResultadoPaginado<Acervo[]>()

    let parametrosHttp = new HttpParams()

    if (pagina != null && itensPorPagina != null) {
      parametrosHttp = parametrosHttp.append('numeroDaPagina', pagina.toString())
      parametrosHttp = parametrosHttp.append('tamanhoDaPagina', itensPorPagina.toString())
      parametrosHttp = parametrosHttp.append('pesquisarPor', pesquisarPor)
      parametrosHttp = parametrosHttp.append('genero', genero)
    }

    if (argumento != null && argumento != '') {
      parametrosHttp = parametrosHttp.append('argumento', argumento)
    }

    return this.#http
      .get<Acervo[]>(`${this.baseUrl}Recentes`, { observe: 'response', params: parametrosHttp })
      .pipe(
        take(3),
        map((response: any) => {
          resultadoPaginado.resultado = response.body

          if (response.headers.has('Paginacao')) {
            resultadoPaginado.paginacao = JSON.parse(response.headers.get('Paginacao'))
          }

          return resultadoPaginado
        }))
  }
}
