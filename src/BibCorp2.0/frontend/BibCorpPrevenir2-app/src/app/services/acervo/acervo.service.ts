import { Injectable, inject } from "@angular/core";
import { environment } from "../../../assets/environments";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map, take } from "rxjs";
import { Acervo } from "../../shared/models/interfaces/acervo";
import { ResultadoPaginado } from "../../util/class";

@Injectable({
  providedIn: "root",
})
export class AcervoService {
  #http = inject(HttpClient);

  baseURL = `${environment.apiURL}Acervos/`;

  public getAcervos(
    fisltrarPor?: string,
    TipoFiltro?: string
  ): Observable<Acervo[]> {
      return this.#http.get<Acervo[]>(this.baseURL).pipe(take(3));
  }

  public getGoogleBooks(isbn: string): Observable<Acervo> {
    return this.#http
      .get<Acervo>(`${this.baseURL}External/${isbn}/googlebooks`)
      .pipe(take(3));
  }

  public getAcervoById(id: number): Observable<Acervo> {
    return this.#http.get<Acervo>(`${this.baseURL}${id}`).pipe(take(3));
  }

  public getAcervoByISBN(isbn: string): Observable<Acervo> {
    return this.#http.get<Acervo>(`${this.baseURL}${isbn}/ISBN`).pipe(take(3));
  }

  public createAcervo(acervo: Acervo): Observable<Acervo> {
    return this.#http.post<Acervo>(this.baseURL, acervo).pipe(take(3));
  }

  public saveAcervo(acervo: Acervo): Observable<Acervo> {
    return this.#http
      .put<Acervo>(`${this.baseURL}${acervo.id}`, acervo)
      .pipe(take(3));
  }

  public deleteAcervo(acervoId: number): Observable<any> {
    return this.#http
      .delete(`${this.baseURL}${acervoId}?acervo=${acervoId}`)
      .pipe(take(3));
  }

  public getAcervosRecentes(
    pagina?: number,
    itensPorPagina?: number,
    argumento?: string,
    pesquisarPor: string = "Todos",
    genero: string = "Todos"
  ): Observable<ResultadoPaginado<Acervo[]>> {
    const resultadoPaginado: ResultadoPaginado<Acervo[]> =
      new ResultadoPaginado<Acervo[]>();

    let parametrosHttp = new HttpParams();

    if (pagina != null && itensPorPagina != null) {
      parametrosHttp = parametrosHttp.append(
        "numeroDaPagina",
        pagina.toString()
      );
      parametrosHttp = parametrosHttp.append(
        "tamanhoDaPagina",
        itensPorPagina.toString()
      );
      parametrosHttp = parametrosHttp.append("pesquisarPor", pesquisarPor);
      parametrosHttp = parametrosHttp.append("genero", genero);
    }

    if (argumento != null && argumento != "") {
      parametrosHttp = parametrosHttp.append("argumento", argumento);
    }

    return this.#http
      .get<Acervo[]>(`${this.baseURL}Recentes`, {
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

  public getAcervosPaginacao(
    pagina?: number,
    itensPorPagina?: number,
    argumento?: string,
    pesquisarPor: string = "Todos",
    genero: string = "Todos"
  ): Observable<ResultadoPaginado<Acervo[]>> {
    const resultadoPaginado: ResultadoPaginado<Acervo[]> =
      new ResultadoPaginado<Acervo[]>();

    let parametrosHttp = new HttpParams();

    if (pagina != null && itensPorPagina != null) {
      parametrosHttp = parametrosHttp.append(
        "numeroDaPagina",
        pagina.toString()
      );
      parametrosHttp = parametrosHttp.append(
        "tamanhoDaPagina",
        itensPorPagina.toString()
      );
      parametrosHttp = parametrosHttp.append("pesquisarPor", pesquisarPor);
      parametrosHttp = parametrosHttp.append("genero", genero);
    }

    if (argumento != null && argumento != "") {
      parametrosHttp = parametrosHttp.append("argumento", argumento);
    }

    return this.#http
      .get<Acervo[]>(`${this.baseURL}Paginacao`, {
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
}
