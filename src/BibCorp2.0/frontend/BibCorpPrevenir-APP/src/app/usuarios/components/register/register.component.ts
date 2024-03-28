import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Usuario } from "../../interfaces";
import { UsuarioService } from "../../services/usuario";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormValidator } from "../../../util";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  #router = inject(Router);
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
    this.#router.navigateByUrl("/homePage");
    location.replace("/homePage");
  }

  public register(): void {
    this.#spinnerService.show();

    this.usuario = { ...this.formCadastro.value };

    this.#usuarioService
      .createUser(this.usuario)
      .subscribe({
        next: () => {
          this.#router.navigateByUrl("/principal");
          location.replace("/princial");
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
