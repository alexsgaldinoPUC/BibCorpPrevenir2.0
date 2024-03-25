import { Component, OnInit, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { UsuarioLogin } from "../../interfaces";
import { LoginService } from "../../services";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { FormValidator } from "../../../util";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
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
      .subscribe(
        () => {
          if (this.model.userName == "Admin") {
            this.#router.navigateByUrl("/home-admin");
            location.replace("/home-admin");
          } else {
            this.#router.navigateByUrl("/principal");
            location.replace("/principal");
          }
        },
        (error: any) => {
          if (error.status == 401)
            this.#toastrService.error("Usuário ou senha inválidos");
          else {
            this.#toastrService.error("Falha ao logar no sistema");
            console.error(error);
          }
        }
      )
      .add(() => this.#spinnerService.hide());
  }

  public reloadPrincipal(): void {
    this.#router.navigateByUrl("/homePage");
    location.replace("/homePage");
  }
}
