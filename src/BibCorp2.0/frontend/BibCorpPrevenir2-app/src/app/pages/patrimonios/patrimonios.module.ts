import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatrimoniosRoutingModule } from './patrimonios-routing.module';
import { PatrimoniosComponent } from './patrimonios.component';


@NgModule({
  declarations: [
    PatrimoniosComponent
  ],
  imports: [
    CommonModule,
    PatrimoniosRoutingModule
  ]
})
export class PatrimoniosModule { }
