import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { Observable, map, shareReplay, take } from "rxjs";

import { environment } from "../../../assets/environments";

import { LoginService } from "./login.service";

import { Usuario, UsuarioUpdate } from "../../shared/models/interfaces/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  #http = inject(HttpClient);
  #loginService = inject(LoginService);

  public baseURL = `${environment.apiURL}Usuarios/`;

  public userLoged = {} as Usuario;

  public createUser(model: any): Observable<void> {
    return this.#http.post<Usuario>(this.baseURL + "CreateUsuario", model).pipe(
      take(1),
      map((response: Usuario) => {
        const user = response;
        if (user) this.#loginService.setCurrentUser(user);
      })
    );
  }

  public getUsuarioByUserName(): Observable<Usuario> {
    return this.#http
      .get<Usuario>(this.baseURL + "getusername")
      .pipe(shareReplay());
  }

  public getUsuarioById(usuarioId: number): Observable<Usuario> {
    return this.#http
      .get<Usuario>(`${this.baseURL}GetUsuario/${usuarioId}`)
      .pipe(take(1));
  }

  public updateUser(model: UsuarioUpdate): Observable<void> {
    return this.#http.put<Usuario>(this.baseURL + "UpdateUsuario", model).pipe(
      take(1),
      map((user: Usuario) => {
        this.#loginService.setCurrentUser(user);
      })
    );
  }

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.#http
      .get<Usuario[]>(this.baseURL + "GetUsuarios")
      .pipe(take(1));
  }
}
