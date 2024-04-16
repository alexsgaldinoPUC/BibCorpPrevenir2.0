import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmprestimosRoutingModule } from "./emprestimos-routing.module";
import { EmprestimosComponent } from "./emprestimos.component";

@NgModule({
  declarations: [EmprestimosComponent],
  imports: [CommonModule, EmprestimosRoutingModule],
})
export class EmprestimosModule {}
