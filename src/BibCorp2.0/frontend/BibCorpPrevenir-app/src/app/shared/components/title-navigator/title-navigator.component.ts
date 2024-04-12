import { Component, Input, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Usuario, UsuarioLogin } from '../../models/interfaces/usuario';

import { LoginService, UsuarioService } from '../../../services/usuario';

import { environment } from '../../../../assets/environments';

@Component({
  selector: 'app-title-navigator',
  templateUrl: './title-navigator.component.html',
  styleUrl: './title-navigator.component.scss'
})
export class TitleNavigatorComponent implements OnInit{
  #loginService = inject(LoginService)
  #spinnerService = inject(NgxSpinnerService)
  #usuarioService = inject(UsuarioService);
  #toastrService = inject(ToastrService);

  @Input() title: string | undefined;

  public usuarioLogado = false;

  public usuarioAtivo = {} as UsuarioLogin;

  public usuario = {} as Usuario;

  public fotoURL = "";

  public showCabecalho(): boolean {
    return this.router.url != "/pages/usuarios/login" && this.router.url != "/pages/usuarios/cadastro";
  }

  constructor(private router: Router) {
    router.events.subscribe((verifyUser) => {
      if (verifyUser instanceof NavigationEnd)
        this.#loginService.currentUser$.subscribe((userActive) => {
          this.usuarioLogado = userActive !== null;
          this.usuarioAtivo = { ...userActive };
        });
    });
  }

  ngOnInit() {
    this.getUsuario();
    this.usuarioLogado = this.usuarioAtivo !== null;
  }

  public listNavigate(): void {
    this.router.navigate([`/${this.title?.toLocaleLowerCase()}/list`])
  }

  public login(): void {
    this.router.navigateByUrl("/pages/usuairos/login");
    location.replace("/pages/usuarios/login");
  }

  public register(): void {
    this.router.navigateByUrl("/pages/usuarios/cadastro");
    location.replace("/pages/usuarios/cadastro");
  }

  public logout(): void {
    this.#loginService.logout();
    this.router.navigateByUrl("/pages/home/homePage");
    location.replace("/pages/home/homePage");

  }

  public getUsuario(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuarioAtivo: Usuario) => {
          this.usuario = { ...usuarioAtivo };
          this.usuarioLogado = this.usuarioAtivo.userName != null;
          this.fotoURL =
            this.usuario.fotoURL === null
              ? "../../../../assets/images/not-available.png"
              : environment.fotoURL + this.usuario.fotoURL;
          console.log(this.fotoURL);
        },
        error: (error: any) => {
          if (error.status == 401) {
            this.usuarioLogado = false;
          } else {
            this.#toastrService.error("Falha ao logar no sistema");
            console.error(error);
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
