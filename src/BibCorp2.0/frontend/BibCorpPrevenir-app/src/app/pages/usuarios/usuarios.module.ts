import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../../app-routing.module";

import {
  CadastroComponent,
  LoginComponent,
  PerfilComponent,
  UsuariosComponent,
} from ".";
import { DetalheComponent } from "./perfil/detalhe";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    PerfilComponent,
    UsuariosComponent,
    DetalheComponent,
    CadastroComponent,
    LoginComponent,
  ],
  exports: [
    PerfilComponent,
    UsuariosComponent,
    DetalheComponent,
    CadastroComponent,
    LoginComponent,
  ],
  imports: [ 
    AppRoutingModule, 
    CommonModule, 
    NgxSpinnerModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    
    SharedModule],
  providers: [],
})
export class UsuariosModule {}
