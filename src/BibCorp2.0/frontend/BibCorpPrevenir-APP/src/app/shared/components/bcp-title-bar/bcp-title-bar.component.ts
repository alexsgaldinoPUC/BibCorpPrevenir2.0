import { CommonModule } from '@angular/common';
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-bcp-title-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./bcp-title-bar.component.html",
  styleUrl: "./bcp-title-bar.component.scss",
})
export class BcpTitleBarComponent {
  @Input() title: string | undefined;

  public usuarioLogado = false;

  //public usuarioAtivo = {} as UsuarioLogin;
  usuarioAtivo = {};

  constructor(
//    public loginService: LoginService,
    private router: Router,
//    public spinnerService: NgxSpinnerService,
//    public toastrService: ToastrService
  ) {
/*    router.events.subscribe((verifyUser) => {
      if (verifyUser instanceof NavigationEnd)
        this.loginService.currentUser$.subscribe((userActive) => {
          this.usuarioLogado = userActive !== null;
          this.usuarioAtivo = { ...userActive };
        });
    });
  */  }

  ngOnInit() {
    this.usuarioLogado = this.usuarioAtivo !== null;
  }

  public listNavigate(): void {
    this.router.navigate([`/${this.title?.toLocaleLowerCase()}/list`]);
  }

  public showCabecalho(): boolean {
    return true;
/*    return (
      this.router.url != "/usuarios/login" &&
      this.router.url != "/usuarios/cadastro" &&
      this.usuarioLogado
    );
*/  }
}
