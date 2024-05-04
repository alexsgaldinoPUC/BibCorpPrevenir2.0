import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { SharedModule } from "../../shared";
import { EmprestimosComponent, GerenciarEmprestimosComponent, GerenciarReservasComponent, ModalEmprestarComponent, ModalSucessoComponent } from ".";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    EmprestimosComponent,
    GerenciarEmprestimosComponent,
    GerenciarReservasComponent,
    ModalEmprestarComponent,
    ModalSucessoComponent,
  ],
  exports: [
    EmprestimosComponent,
    GerenciarEmprestimosComponent,
    GerenciarReservasComponent,
    ModalEmprestarComponent,
    ModalSucessoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SharedModule
  ],
})
export class EmprestimosModule {}
