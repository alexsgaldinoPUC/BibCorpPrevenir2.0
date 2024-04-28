import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario';
import { UploadService } from '../../../services/upload';
import { Usuario } from '../../../shared/models/interfaces/usuario';
import { environment } from '../../../../assets/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  #router = inject(Router)
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);
  #uploadService = inject(UploadService);

  public fotoUpload: string = "not-available.png";
  public fotoURL: string = "../../../../assets/images/upload.png";
  public file!: File[];

  public usuario = {} as Usuario;

  public email!: string;

  ngOnInit(): void {
    this.getUsuarioLogado();
  }

  public changePhoto(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.fotoUpload = event.target.result);

    this.file = ev.target.files;

    reader.readAsDataURL(this.file[0]);

    this.uplodaPhoto();
  }

  public uplodaPhoto(): void {
    this.#spinnerService.show();

    this.#uploadService
      .salvarFotoUsuario(this.file)
      .subscribe({
        next: () => {
          this.#toastrService.success("Foto atualizada!", "Sucesso!"),
          this.getUsuarioLogado();
          this.#router.navigateByUrl("/pages/usuarios/perfil");
          location.replace("/pages/usuarios/perfil");
        },
        error: (error: any) => {
          this.#toastrService.error(
            error.error,
            `Erro! Status ${error.status}`
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getUsuarioLogado(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuario: Usuario) => {
          this.usuario = { ...usuario };
          this.fotoURL =
            this.usuario.fotoURL !== "" && this.usuario.fotoURL !== null
              ? environment.fotoURL + this.usuario.fotoURL
              : "../../../../assets/images/upload.png";
        },
        error: (error: any) => {
          this.#toastrService.error(
            error.error,
            `Erro! Status ${error.status}`
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getDataLoged(_usuarioLogado: Usuario): void {
    this.usuario = _usuarioLogado
  }
}
