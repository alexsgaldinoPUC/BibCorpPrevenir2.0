import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AcervoDetalheComponent, AcervoEdicaoComponent, AcervoListaComponent, AcervosComponent } from '.';


@NgModule({
  declarations: [
    AcervosComponent,
    AcervoDetalheComponent,
    AcervoEdicaoComponent,
    AcervoListaComponent,
  ],
  exports: [
    AcervosComponent,
    AcervoDetalheComponent,
    AcervoEdicaoComponent,
    AcervoListaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,

    SharedModule
  ],
})
export class AcervosModule { }
