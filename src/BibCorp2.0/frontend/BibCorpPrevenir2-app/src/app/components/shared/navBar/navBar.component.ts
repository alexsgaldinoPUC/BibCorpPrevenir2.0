import { Component, OnInit, inject } from "@angular/core";
import { UsuarioService } from "../../../services/usuario";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Usuario } from "../../../interfaces/usuario";
import { environment } from "../../../../assets/environments";

@Component({
  selector: "app-navBar",
  templateUrl: "./navBar.component.html",
})
export class NavBarComponent implements OnInit {
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public usuarioLogado = false;
  public usuarioAdmin = false;

  public usuarioAtivo = {} as Usuario;

  public fotoURL = "";

  constructor() {}

  ngOnInit() {
    this.getUsuario();
  }

  public getUsuario(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuarioAtivo: Usuario) => {
          this.usuarioAtivo = { ...usuarioAtivo };
          this.usuarioLogado = this.usuarioAtivo.userName ? true : false;
          this.fotoURL =
            this.usuarioAtivo.fotoURL === null
              ? "../../../../../assets/images/not-available.png"
              : environment.fotoURL + this.usuarioAtivo.fotoURL;
          console.log(this.fotoURL);

          this.usuarioAdmin = this.usuarioAtivo.userName === "Admin";
          console.log(this.usuarioLogado, this.usuarioAdmin);
        },
        error: (error: any) => {
          if (error.status == 401) {
          } else {
            this.#toastrService.error("Falha ao logar no sistema");
            console.error(error);
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
