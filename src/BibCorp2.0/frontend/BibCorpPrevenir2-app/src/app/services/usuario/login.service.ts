import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../assets/environments';
import { Observable, ReplaySubject, map, take } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { Constants } from '../../util/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #http = inject(HttpClient);

  public baseURL = environment.apiURL + "Usuarios/";

  private currentUserSource = new ReplaySubject<Usuario>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  public login(_model: any): Observable<void> {
    console.log("Aqui 3: ")
    console.log(_model);
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
    this.currentUserSource.next(_usuario);
  }

  public logout(): void {
    localStorage.removeItem(Constants.LOCAL_STORAGE_NAME);
    this.currentUserSource.next(null as any);
    this.currentUserSource.complete();
  }

  public userLoged(usuario: Usuario): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_NAME, JSON.stringify(usuario));
    this.currentUserSource.next(usuario);
  }

}
