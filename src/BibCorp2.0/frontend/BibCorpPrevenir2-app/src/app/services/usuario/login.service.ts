import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, ReplaySubject, map, take } from 'rxjs';

import { Constants } from '../../util/constants';

import { Usuario } from '../../shared/models/interfaces/usuario';

import { environment } from '../../../assets/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #http = inject(HttpClient);
  #currentUserSource = new ReplaySubject<Usuario>(1);

  public baseURL = `${environment.apiURL}Usuarios/`;

  public currentUser$ = this.#currentUserSource.asObservable();

  public login(_model: any): Observable<void> {
    return this.#http.post<Usuario>(this.baseURL + "Login", _model).pipe(
      take(1),
      map((response: Usuario) => {
        const usuario = response;
        if (usuario) {
          this.setCurrentUser(usuario);
        }
      })
    );
  }

  public setCurrentUser(_usuario: Usuario): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_NAME, JSON.stringify(_usuario));
    this.#currentUserSource.next(_usuario);
  }

  public logout(): void {
    localStorage.removeItem(Constants.LOCAL_STORAGE_NAME);
    this.#currentUserSource.next(null as any);
    this.#currentUserSource.complete();
  }

  public userLoged(usuario: Usuario): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_NAME, JSON.stringify(usuario));
    this.#currentUserSource.next(usuario);
  }

}
