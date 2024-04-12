import { Component, inject } from '@angular/core';

import { Usuario } from '../../../shared/models/interfaces/usuario';
import { Emprestimo, FiltroEmprestimo } from '../../../shared/models/interfaces/emprestimo';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmprestimoService } from '../../../services/emprestimo/emprestimo.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {
  #emprestimoService = inject(EmprestimoService)
  #spinnerService = inject(NgxSpinnerService)
  #toastrService = inject(ToastrService)
  #usuarioService = inject(UsuarioService)

  public emprestimos: Emprestimo[] = [];
  public filtroEmprestimo!: FiltroEmprestimo;
  public usuarios: Usuario[] = [];

  public exibirImagem: boolean = true;

  public dataInicio!: Date;
  public dataFim!: Date;

  public showUserDropdown: boolean = false;
  public showStatusDropdown: boolean = false;

  public status: string[] = [];

  public selectedUsers: { [key: string]: boolean} = {};
  public selectedStatus: { [key: string]: boolean} = {};

  ngOnInit(): void {
    this.getAllEmprestimos()
    this.getAllUsuarios()
    this.obterSituacoes()
    this.selectedUsers = {};
    this.selectedStatus = {};
    this.showUserDropdown = false;
    this.showStatusDropdown = false;
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown
  }

  public toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown
  }

  public onUserOptionChange() {
    // Lógica adicional, se necessário
  }

  public getAllEmprestimos(): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .getAllEmprestimos()
      .subscribe({
        next: (retorno: Emprestimo[]) => {
          this.emprestimos = retorno;
        },

        error: (error: any) => {
          this.#toastrService.error("Erro ao buscar os empréstimos", "Erro!");
          console.error(error);
        }
        }
      )
      .add(() => this.#spinnerService.hide());
  }

  public getEmprestimosFiltrados(dataInicio: Date, dataFim: Date, selectedUsers: { [key: string]: boolean} = {}, selectedStatus: { [key: string]: boolean} = {}): void {
    this.#spinnerService.show();

    let usuarioParametro: any = ""
    let listaDeUsuarios: any = ""
    let statusParametro: any = ""
    let listaDeStatus: any = ""

    Object.keys(selectedUsers).forEach(user =>{
        usuarioParametro = `&Usuarios=${user}`
        listaDeUsuarios += usuarioParametro
    })

    Object.keys(selectedStatus).forEach(status =>{
      statusParametro = `&Status=${status}`
      listaDeStatus += statusParametro
  })

    this.filtroEmprestimo.dataInicio = formatDate(dataInicio, "YYYY-MM-dd","en-US")
    this.filtroEmprestimo.dataFim = formatDate(dataFim, "YYYY-MM-dd","en-US")
    this.filtroEmprestimo.usuarios = listaDeUsuarios
    this.filtroEmprestimo.status = listaDeStatus

    this.#emprestimoService
      .getEmprestimosFiltrados(this.filtroEmprestimo)
      .subscribe({
        next: (retorno: Emprestimo[]) => {
          this.emprestimos = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao buscar os empréstimos filtrados", "Erro!");
          console.error(error);
        }
      }
    )
    .add(() => this.#spinnerService.hide());
  }

  public getAllUsuarios(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getAllUsuarios()
      .subscribe( {
        next: (retorno: Usuario[]) => {
          this.usuarios = retorno;
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao buscar os usuários", "Erro!");
          console.error(error);
        }
      }
    )
    .add(() => this.#spinnerService.hide());
  }

  public obterSituacoes(): void{

    this.status = ["Reservado","Emprestado","Devolvido","Renovado","Recusado"]
   
  }

  public formatarData(data: Date): any{

    if (data != null){
      return formatDate(data, "dd/MM/YYYY","en-US")
    } 

    return null;
  }

  public obterStatus(emprestimo: Emprestimo): any {
    
    let dataAtual = new Date()
    let dataPrevistaDevolucao = emprestimo.dataPrevistaDevolucao;

    if (dataPrevistaDevolucao < dataAtual &&
      emprestimo.dataDevolucao == null && (emprestimo.status == 2 || emprestimo.status == 4)
    ) {
      return "Em atraso";
    }
      else if (emprestimo.status == 1) {
      return "Reservado";
    } else if (emprestimo.status == 2) {
      return "Emprestado";
    } else if (emprestimo.status == 3) {
      return "Devolvido";
    } else if (emprestimo.status == 4) {
      return "Renovado";
    } else if (emprestimo.status == 5) {
      return "Recusado";
    } else return "-";
}
}
