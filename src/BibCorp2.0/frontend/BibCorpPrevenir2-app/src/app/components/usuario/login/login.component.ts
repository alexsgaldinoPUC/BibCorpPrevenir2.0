import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../../services/usuario';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioLogin } from '../../../interfaces/usuario';
import { FormValidator } from '../../../util/class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  #loginService = inject(LoginService);
  #spinnerService = inject(NgxSpinnerService);
  #router = inject(Router);
  #toastrService = inject(ToastrService);

  public formLogin = {} as FormGroup;

  public model = {} as UsuarioLogin;

  public get ctrF(): any {
    return this.formLogin.controls;
  }

  public ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.formLogin = new FormGroup({
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
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

  public login(): void {
    this.#spinnerService.show();

    this.model = { ...this.formLogin.value };

    this.#loginService
      .login(this.model)
      .subscribe({
        next: () => {
          if (this.model.userName == "Admin") {
            this.#router.navigateByUrl("/home/homeadmin");
            location.replace("/home-admin");
          } else {
            this.#router.navigateByUrl("home/homepage");
            location.replace("/principal");
          }
        },
        error: (error: any) => {
          if (error.status == 401)
            this.#toastrService.error("Usuário ou senha inválidos");
          else {
            this.#toastrService.error("Falha ao logar no sistema");
            console.error(error);
          }
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public reloadPrincipal(): void {
    this.#router.navigateByUrl("/home/homePage");
    location.replace("/home/homePage");
  }

}
