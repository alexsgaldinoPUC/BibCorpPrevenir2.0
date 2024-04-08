import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/usuario';
import { Usuario } from './interfaces/usuario';
import { Constants } from './util/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  #loginService = inject(LoginService)
  #router = inject(Router)
  
  title = 'BibCorpPrevenir2-app';

  public showDrawer(): boolean{
    return this.#router.url != '/usuarios/login' && this.#router.url != '/usuarios/register';
  }

  ngOnInit (): void {
    this.setCurrentUser();
  }

  public setCurrentUser(): void {
    let usuario = {} as Usuario;

    if (localStorage.getItem(Constants.LOCAL_STORAGE_NAME))
      usuario = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_NAME) ?? '{}');

    if (usuario)
      this.#loginService.setCurrentUser(usuario);
  }
}
