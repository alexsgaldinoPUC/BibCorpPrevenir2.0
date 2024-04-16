import { Component, inject } from '@angular/core';
import { LoginService } from './services/usuario';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Usuario } from './shared/models/interfaces/usuario';
import { Constants } from './util/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #loginService = inject(LoginService);
  #router = inject(Router);
  #breakpointObserver = inject(BreakpointObserver);

  public title = "BibCorpPrevenir2-app";

  public openedDrawer = true;

  public get modeDrawer() {
    return this.openedDrawer ? "side" : "over";
  }

  public showDrawer(): boolean {
    return (
      this.#router.url != "/pages/usuarios/login" &&
      this.#router.url != "/pages/usuarios/cadastro"
    );
  }

  ngAfterContentInit(): void {
    this.#breakpointObserver.observe(["(max-width: 800px)"])
    .subscribe((res) => this.openedDrawer = !res.matches);
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  public setCurrentUser(): void {
    let usuario = {} as Usuario;

    if (localStorage.getItem(Constants.LOCAL_STORAGE_NAME))
      usuario = JSON.parse(
        localStorage.getItem(Constants.LOCAL_STORAGE_NAME) ?? "{}"
      );

    if (usuario) this.#loginService.setCurrentUser(usuario);
  }
}
