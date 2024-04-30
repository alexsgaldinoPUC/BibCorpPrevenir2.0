import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmprestimosComponent } from "./emprestimos.component";
import { SharedModule } from "../../shared";
import { ModalSucessoComponent } from "./modal-sucesso";

@NgModule({
  declarations: [EmprestimosComponent, ModalSucessoComponent],
  exports: [EmprestimosComponent, ModalSucessoComponent],
  imports: [
    CommonModule,

    SharedModule
  ],
})
export class EmprestimosModule {}
