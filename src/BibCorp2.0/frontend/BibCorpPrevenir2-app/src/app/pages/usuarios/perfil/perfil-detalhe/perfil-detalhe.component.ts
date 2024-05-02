import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario';
import { Usuario } from '../../../../shared/models/interfaces/usuario';
import { FormValidator } from '../../../../util/class';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html'
})
export class PerfilDetalheComponent {

  #formBuilder = inject(FormBuilder);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  @Output() changeFormValue = new EventEmitter();

  public formPerfil!: FormGroup;

  public usuario = {} as Usuario;

  public get ctrF(): any {
    return this.formPerfil.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.getUsuarioLogado();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: FormValidator.argsCompare("password", "confirmPassword"),
    };

    this.formPerfil = this.#formBuilder.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      password: ["", [Validators.minLength(6), Validators.nullValidator]],
      confirmPassword: ["", Validators.nullValidator],
      userName: [""]
    }), formOptions;
    this.formPerfil.valueChanges.subscribe(() =>
      this.changeFormValue.emit({ ...this.formPerfil.value })
    );
  }

  public onSubmit(): void {
    if (this.formPerfil.valid) {
      this.#spinnerService.show();

      this.usuario.nome = this.ctrF.nome.value;
      this.usuario.phoneNumber = this.ctrF.phoneNumber.value;
      this.usuario.userName = this.ctrF.userName.value

      this.#usuarioService
        .updateUser(this.usuario)
        .subscribe({
          next: (usuario: void) => {
            this.#toastrService.success("Perfil atualizado!", "Sucesso!");
          },
          error: (error: any) => {
            this.#toastrService.error(
              error.error,
              `Erro! Status ${error.status}`
            );
          },
        })
        .add(() => this.#spinnerService.hide());
    }
  }

  public fieldValidator(campoForm: FormControl): any {
    return FormValidator.checkFieldsWhithError(campoForm);
  }

  public messageReturned(nomeCampo: FormControl, nomeElemento: string): any {
    return FormValidator.returnMessage(nomeCampo, nomeElemento);
  }
  // Conveniente para pegar um FormField apenas com a letra F

  public resetForm(event: any): void {
    event.preventDefault();
    this.formPerfil.reset();
  }

  public getUsuarioLogado(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuario: Usuario) => {
          this.usuario = { ...usuario };
          this.formPerfil.patchValue(this.usuario);
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
}
