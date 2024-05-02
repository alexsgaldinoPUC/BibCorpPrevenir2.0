import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-sucesso',
  templateUrl: './modal-sucesso.component.html',
  styleUrl: './modal-sucesso.component.scss'
})
export class ModalSucessoComponent {
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
