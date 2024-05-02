import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoginService } from '../../../services/usuario';
import { Usuario } from '../../../shared/models/interfaces/usuario';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  #loginService = inject(LoginService)

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userCurrent: Usuario

    this.#loginService.currentUser$
      .pipe(take(1)) // Solo una vez por solic
      .subscribe(
        usuario => {
          userCurrent = usuario

          if(userCurrent) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${userCurrent?.token}`
              }
            }
          )
          }
        }
      );

      return next.handle(req);
  }


};
