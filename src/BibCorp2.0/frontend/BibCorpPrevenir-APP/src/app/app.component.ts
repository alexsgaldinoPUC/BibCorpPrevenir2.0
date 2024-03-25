import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";

import { BcpNavBarComponent } from './shared';
import { LoginService, Usuario } from './usuarios';
import { Constants } from './util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BcpNavBarComponent, MatIconModule, MatSidenavModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #loginService = inject(LoginService)
  #router = inject(Router)
  title = signal('BibCorpPrevenir-app');

  ngOnInit (): void {
    this.setCurrentUser();
  }

  showDrawer():boolean{
    return this.#router.url != '/login' && this.#router.url != '/register';

  }

  public setCurrentUser(): void {
    let usuario = {} as Usuario;

    if (localStorage.getItem(Constants.LOCAL_STORAGE_NAME))
      usuario = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_NAME) ?? '{}');

    if (usuario)
      this.#loginService.setCurrentUser(usuario);
  }
}
