import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared';
import { AcervoDetalheComponent, AcervoEdicaoComponent, AcervoListaComponent, AcervosComponent } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { PatrimonioService } from '../../services/patrimonio';


@NgModule({
  declarations: [
    AcervosComponent,
    AcervoEdicaoComponent,
    AcervoListaComponent,
    AcervoDetalheComponent,
  ],
  exports: [
    AcervosComponent,
    AcervoEdicaoComponent,
    AcervoListaComponent,
    AcervoDetalheComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SharedModule
  ],
  providers:  [ PatrimonioService]
})
export class AcervosModule { }
