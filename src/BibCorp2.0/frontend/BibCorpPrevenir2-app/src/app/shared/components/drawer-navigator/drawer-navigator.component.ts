import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario';
import { Usuario } from '../../models/interfaces/usuario';
import { environment } from '../../../../assets/environments';

@Component({
  selector: 'app-drawer-navigator',
  templateUrl: './drawer-navigator.component.html'
})
export class DrawerNavigatorComponent {
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public usuarioLogado = false;

  public usuarioAtivo = {} as Usuario;

  public fotoURL = "";

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
