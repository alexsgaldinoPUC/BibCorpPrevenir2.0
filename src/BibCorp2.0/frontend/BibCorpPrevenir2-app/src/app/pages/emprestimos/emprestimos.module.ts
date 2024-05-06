import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../../shared";
import {
  EmprestimoModalEmprestarComponent,
  EmprestimosComponent,
  GerenciarEmprestimosComponent,
  GerenciarReservasComponent,
  MinhasReservasComponent,
  EmprestimoModalSucessoComponent,
  EmprestimoModalLocalComponent,
  EmprestimoModalAlteracaoComponent,
  HistoricoComponent,
} from ".";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgbCollapseModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    EmprestimosComponent,
    GerenciarEmprestimosComponent,
    GerenciarReservasComponent,
    MinhasReservasComponent,
    EmprestimoModalEmprestarComponent,
    EmprestimoModalSucessoComponent,
    EmprestimoModalLocalComponent,
    EmprestimoModalAlteracaoComponent,
    HistoricoComponent
  ],
  exports: [
    EmprestimosComponent,
    GerenciarEmprestimosComponent,
    GerenciarReservasComponent,
    MinhasReservasComponent,
    EmprestimoModalEmprestarComponent,
    EmprestimoModalSucessoComponent,
    EmprestimoModalLocalComponent,
    EmprestimoModalAlteracaoComponent,
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
  ],
})
export class EmprestimosModule {}
