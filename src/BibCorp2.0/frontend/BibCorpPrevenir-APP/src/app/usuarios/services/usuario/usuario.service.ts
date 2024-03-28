import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../assets';
import { Usuario, UsuarioUpdate } from '../../interfaces';
import { LoginService } from '../login';
import { Observable, map, shareReplay, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  #http = inject(HttpClient);
  #loginService = inject(LoginService);

  public baseURL = environment.apiURL + "Usuarios/";

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
      console.log("aqui2");
      return this.#http.get<Usuario>(this.baseURL + "getusername").pipe(shareReplay());
    }

    public getUsuarioById(usuarioId: number): Observable<Usuario> {
      return this.#http
      .get<Usuario>(`${this.baseURL}GetUsuario/${usuarioId}`)
      .pipe(take(1));
    }

    public updateUser(model: UsuarioUpdate): Observable<void> {
      console.log("usuarioService ", model.id)
      return this.#http.put<Usuario>(this.baseURL + "UpdateUsuario", model).pipe(
        take(1),
        map((user: Usuario) => {
          this.#loginService.setCurrentUser(user);
        })
        );
      }

      public getAllUsuarios(): Observable<Usuario[]> {
        return this.#http.get<Usuario[]>(this.baseURL + "GetUsuarios").pipe(take(1));
      }
    }


