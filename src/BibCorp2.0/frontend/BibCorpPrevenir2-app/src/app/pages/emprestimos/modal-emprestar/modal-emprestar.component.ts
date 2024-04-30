import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSucessoComponent } from '../modal-sucesso';

@Component({
  selector: 'app-modal-emprestar',
  templateUrl: './modal-emprestar.component.html'
})
export class ModalEmprestarComponent {


  constructor(private dialog: MatDialog) { }

  fecharModalEmprestarEAbrirModalSucesso() {
    const dialogRefEmprestar = this.dialog.getDialogById('Emprestar');
    if (dialogRefEmprestar) {
      dialogRefEmprestar.close();
    }

    this.dialog.open(ModalSucessoComponent, {
      data: {}, id: 'Sucesso'
    });
  }

}
