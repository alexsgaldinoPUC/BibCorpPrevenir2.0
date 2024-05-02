import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { SharedModule } from "../../shared";
import { EmprestimosComponent, GerenciarReservasComponent, ModalEmprestarComponent, ModalSucessoComponent } from ".";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    EmprestimosComponent, 
    GerenciarReservasComponent,
    ModalEmprestarComponent,
    ModalSucessoComponent, 
  ],
  exports: [
    EmprestimosComponent, 
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
