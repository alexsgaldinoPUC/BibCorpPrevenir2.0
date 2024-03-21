
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { BcpNavBarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BcpNavBarComponent, CommonModule, MatButtonModule, MatSidenavModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BibCorpPrevenir-App';

  constructor (
//    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.setCurrentUser();
  }

  showDrawer():boolean{
    return this.router.url != '/usuarios/login' && this.router.url != '/usuarios/cadastro';

  }

  public setCurrentUser(): void {
/*    let usuario = {} as Usuario;

    if (localStorage.getItem(Constants.LOCAL_STORAGE_NAME))
    usuario = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_NAME) ?? '{}');

    if (usuario)
      this.loginService.setCurrentUser(usuario);
  */  }
}
