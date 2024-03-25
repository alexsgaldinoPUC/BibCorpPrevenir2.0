import { Component, Input, OnInit, inject } from '@angular/core';
import { LoginService, UsuarioLogin } from '../../../usuarios';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-bcp-title-bar',
  standalone: true,
  imports: [],
  templateUrl: './bcp-title-bar.component.html',
  styleUrl: './bcp-title-bar.component.scss'
})
export class BcpTitleBarComponent implements OnInit {
  #loginService = inject(LoginService)

  @Input() title: string | undefined;

  public usuarioLogado = false;

  public usuarioAtivo = {} as UsuarioLogin;


  constructor(
    private router: Router,
    ) {
    router.events
    .subscribe(
      (verifyUser) => {
        if (verifyUser instanceof NavigationEnd)
          this.#loginService.currentUser$
            .subscribe(
              (userActive) => {
                this.usuarioLogado = userActive !== null;
                this.usuarioAtivo = { ...userActive};
              }
            )
      }
    )
   }

  ngOnInit() {
    this.usuarioLogado = this.usuarioAtivo !== null;
  }

  public listNavigate(): void {
    this.router.navigate([`/${this.title?.toLocaleLowerCase()}/list`])
  }

  public showCabecalho(): boolean {
    return this.router.url != '/usuarios/login' && this.router.url != '/usuarios/cadastro' && this.usuarioLogado
  }

}
