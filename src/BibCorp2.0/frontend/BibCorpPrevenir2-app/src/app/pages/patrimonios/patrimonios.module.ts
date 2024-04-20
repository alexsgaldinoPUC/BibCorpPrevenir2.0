import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrimonioDetalheComponent, PatrimonioListaComponent, PatrimoniosComponent } from '.';
import { SharedModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PatrimoniosComponent,
    PatrimonioDetalheComponent,
    PatrimonioListaComponent
  ],
  exports: [
    PatrimoniosComponent,
    PatrimonioDetalheComponent,
    PatrimonioListaComponent
  ],
  imports: [
    ReactiveFormsModule,

    SharedModule
  ]
})
export class PatrimoniosModule { }
