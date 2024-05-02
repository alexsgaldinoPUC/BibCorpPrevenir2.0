import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../shared/models/interfaces/usuario';
import { FormValidator } from '../../../util/class';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  // rotas
  #router = inject(Router);

  // Serviços
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public formCadastro = {} as FormGroup;

  public usuario = {} as Usuario;

  public get ctrF(): any {
    return this.formCadastro.controls;
  }

  public ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.formCadastro = new FormGroup({
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150),
      ]),
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
    });
  }

  public fieldValidator(campoForm: FormControl): any {
    return FormValidator.checkFieldsWhithError(campoForm);
  }

  public messageReturned(nomeCampo: FormControl, nomeElemento: string): any {
    return FormValidator.returnMessage(nomeCampo, nomeElemento);
  }

  public reloadPrincipal(): void {
    this.#router.navigateByUrl("/pages/home/homePage");
    location.replace("/pages/home/homePage");
  }

  public register(): void {
    this.#spinnerService.show();

    this.usuario = { ...this.formCadastro.value };

    this.#usuarioService
      .createUser(this.usuario)
      .subscribe({
        next: () => {
          this.#router.navigateByUrl("/pages/home/homePage");
          location.replace("/pages/home/homePage");
          this.#toastrService.success("Conta Cadastrada!", "Sucesso!");
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Ocorreu um erro ao tentar cadastrar o usuário"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
