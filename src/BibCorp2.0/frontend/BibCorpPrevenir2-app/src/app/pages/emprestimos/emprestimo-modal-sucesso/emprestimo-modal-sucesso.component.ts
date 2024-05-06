import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprestimo-modal-sucesso',
  templateUrl: './emprestimo-modal-sucesso.component.html',
  styleUrl: './emprestimo-modal-sucesso.component.scss'
})
export class EmprestimoModalSucessoComponent {
  #router = inject(Router)
  #dialog = inject (MatDialog)

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any) {  }

  voltarParaAcervoDetalhe() {
    this.#router.navigate(['/pages/acervos/detalhe']); //direcionar para tela Meus Empréstimos/Minhas Reservas

    const dialogRefSucesso = this.#dialog.getDialogById('Sucesso');
    if (dialogRefSucesso) {
      dialogRefSucesso.close();
    }
  }

}
