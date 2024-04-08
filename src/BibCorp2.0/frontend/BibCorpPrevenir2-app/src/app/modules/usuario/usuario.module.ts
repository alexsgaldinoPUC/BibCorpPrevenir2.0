import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, UsuarioComponent } from '../../components/usuario';
import { RegisterComponent } from '../../components/usuario/register';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,

    NgxSpinnerModule,
    SharedModule
  ],
  declarations: [UsuarioComponent, LoginComponent, RegisterComponent]
})
export class UsuarioModule { }
