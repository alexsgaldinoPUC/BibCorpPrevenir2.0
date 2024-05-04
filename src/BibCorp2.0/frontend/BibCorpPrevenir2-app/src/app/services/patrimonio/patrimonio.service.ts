import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../assets/environments';
import { Observable, map, take } from 'rxjs';
import { Patrimonio } from '../../shared/models/interfaces/patrimonio';
import { ResultadoPaginado } from '../../util/class';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {
  #http = inject(HttpClient)

  baseURL =`${environment.apiURL}Patrimonios/`;

  public getPatrimonios(): Observable<Patrimonio[]> {
    return this.#http.get<Patrimonio[]>(this.baseURL).pipe(take(3));
  }

  public getPatrimoniosByISBN(isbn: string): Observable<Patrimonio[]> {
    return this.#http
      .get<Patrimonio[]>(`${this.baseURL}${isbn}/ISBN`)
      .pipe(take(3));
  }

  public getPatrimoniosLivres(isbn: string): Observable<Patrimonio[]> {
    return this.#http
      .get<Patrimonio[]>(`${this.baseURL}Livres/${isbn}`)
      .pipe(take(3));
  }

  public getPatrimonioById(patrimonioId: number): Observable<Patrimonio> {
    return this.#http
      .get<Patrimonio>(`${this.baseURL}${patrimonioId}`)
      .pipe(take(3));
  }

  public createPatrimonio(patrimonio: Patrimonio): Observable<Patrimonio> {
    return this.#http.post<Patrimonio>(this.baseURL, patrimonio).pipe(take(3));
  }

  public savePatrimonio(patrimonio: Patrimonio): Observable<Patrimonio> {
    return this.#http
      .put<Patrimonio>(`${this.baseURL}${patrimonio.id}`, patrimonio)
      .pipe(take(3));
  }

  public getPatrimoniosPaginacao(
    pagina: number = 1,
    itensPorPagina: number = 10,
    argumento: string = '',
    pesquisarPor: string = "Todos"
  ): Observable<ResultadoPaginado<Patrimonio[]>> {
    const resultadoPaginado: ResultadoPaginado<Patrimonio[]> =
      new ResultadoPaginado<Patrimonio[]>();

    let parametrosHttp = new HttpParams();

    if (pagina != null && itensPorPagina != null) {
      parametrosHttp = parametrosHttp.append(
        "NumeroDaPagina",
        pagina.toString()
      );
      parametrosHttp = parametrosHttp.append(
        "TamanhoDaPagina",
        itensPorPagina.toString()
      );
      parametrosHttp = parametrosHttp.append("PesquisarPor", pesquisarPor);
    }

    if (argumento != null && argumento != "") {
      parametrosHttp = parametrosHttp.append("Argumento", argumento);
    } else {
      parametrosHttp = parametrosHttp.append("Argumento", "null");
    }

    return this.#http
      .get<Patrimonio[]>(`${this.baseURL}Paginacao`, {
        observe: "response",
        params: parametrosHttp,
      })
      .pipe(
        take(3),
        map((response: any) => {
          resultadoPaginado.resultado = response.body;
          if (response.headers.has("Paginacao")) {
            resultadoPaginado.paginacao = JSON.parse(
              response.headers.get("Paginacao")
            );
          }

          return resultadoPaginado;
        })
      );
  }

  public deletePatrimonio(patrimonioId: number): Observable<any> {
    return this.#http
      .delete(`${this.baseURL}${patrimonioId}?patrimonio=${patrimonioId}`)
      .pipe(take(3));
  }

}
