import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared';
import { CadastroComponent, LoginComponent, UsuariosComponent } from '.';
import { PerfilComponent, PerfilDetalheComponent } from './perfil';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosComponent,
    CadastroComponent,
    LoginComponent,
    PerfilComponent,
    PerfilDetalheComponent,
  ],
  exports: [
    UsuariosComponent,
    CadastroComponent,
    LoginComponent,
    PerfilComponent,
    PerfilDetalheComponent,
  ],
  imports: [
    ReactiveFormsModule,
    
    SharedModule
  ]
})
export class UsuariosModule { }
