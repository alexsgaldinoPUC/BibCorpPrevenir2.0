import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcervosRoutingModule } from './acervos-routing.module';
import { AcervosComponent } from './acervos.component';
import { AcervoListaComponent } from './acervo-lista/acervo-lista.component';
import { AcervoDetalheComponent } from './acervo-detalhe/acervo-detalhe.component';
import { AcervoEditarComponent } from './acervo-editar/acervo-editar.component';
import { AcervoNovoComponent } from './acervo-novo/acervo-novo.component';


@NgModule({
  declarations: [
    AcervosComponent,
    AcervoListaComponent,
    AcervoDetalheComponent,
    AcervoEditarComponent,
    AcervoNovoComponent
  ],
  imports: [
    CommonModule,
    AcervosRoutingModule
  ]
})
export class AcervosModule { }
