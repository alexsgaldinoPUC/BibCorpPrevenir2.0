import { Component, OnInit, inject } from "@angular/core";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from "../../../services/usuario";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { EmprestimoService } from "../../../services/emprestimo";
import {
  EmprestimoModalAlteracaoComponent,
  EmprestimoModalRenovarComponent,
} from "..";
import { MatDialog } from "@angular/material/dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-minhas-reservas",
  templateUrl: "./minhas-reservas.component.html",
  styleUrls: ["./minhas-reservas.component.scss"],
})
export class MinhasReservasComponent {
  #dialog = inject(MatDialog);
  #emprestimoService = inject(EmprestimoService);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public emprestimos = [] as Emprestimo[];

  public usuarioAtivo = {} as Usuario;
  // // modalRef: BsModalRef;
  // public emprestimosFiltrados: Emprestimo[] = [];

  // public acervos: Acervo[] = [];
  // public acervosFiltrados: Acervo[] = [];
  // public acervo: Acervo;

  // public usuarioLogado = false;
  // public usuarioAtivo = {} as UsuarioLogin;

  // public larguraImagem = 75;
  // public margemImagem = 2;
  // public exibirImagem = true;
  // private filtroListado = "";

  // //----------------------------------------------FILTROS--------------------------------------------------
  // public get filtroLista(): string {
  //   return this.filtroListado;
  // }

  // public set filtroLista(value: string) {
  //   this.filtroListado = value;
  //   this.acervosFiltrados = this.filtroLista
  //     ? this.filtrarReservas(this.filtroLista)
  //     : this.acervos;
  // }

  // public filtrarReservas(filtrarPor: string): Acervo[] {
  //   filtrarPor = filtrarPor.toLocaleLowerCase();
  //   return this.acervos.filter(
  //     (livro) =>
  //       livro.titulo.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
  //       livro.autor.toLocaleLowerCase().indexOf(filtrarPor) !== -1
  //   );
  // }

  // //----------------------------------------------VERIFICAÇÃO DE USUARIO e MÉTODOS--------------------------------------------------

  // constructor(
  //   private emprestimoService: EmprestimoService,
  //   private acervoService: AcervoService,
  //   private toastr: ToastrService,
  //   private spinner: NgxSpinnerService,
  //   private dialogRef: MatDialog,
  //   public loginService: LoginService,
  //   private router: Router
  // ) {
  //   router.events.subscribe((verifyUser) => {
  //     if (verifyUser instanceof NavigationEnd)
  //       this.loginService.currentUser$.subscribe((userActive) => {
  //         this.usuarioLogado = userActive !== null;
  //         this.usuarioAtivo = { ...userActive };
  //       });
  //   });
  // }

  public abrirDialogRenovacao(
    emprestimoId: number,
    acervoTitulo: string,
    dataPrevistaDevolucao: Date
  ) {
    this.#dialog.open(EmprestimoModalRenovarComponent, {
      data: {
        emprestimoId: emprestimoId,
        acervoTitulo: acervoTitulo,
        dataPrevistaDevolucao: dataPrevistaDevolucao,
        id: "Renovar",
      },
    });
  }

  public abrirDialogAlteracao(
    emprestimoId: number,
    localDeColetaAtual: string
  ) {
    this.#dialog.open(EmprestimoModalAlteracaoComponent, {
      data: {
        emprestimoId: emprestimoId,
        localDeColetaAtual: localDeColetaAtual,
        id: "Alterar",
      },
    });
  }

  public ngOnInit(): void {
    this.getUserName().then(() => {
      this.getEmprestimosByUserName();
    });
    //  this.getPatrimonios();
    //   this.getAcervo();

    //   this.usuarioLogado = this.usuarioAtivo !== null;
  }
  public getUserName(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#spinnerService.show();

      this.#usuarioService
        .getUsuarioByUserName()
        .subscribe({
          next: (usuario: Usuario) => {
            this.usuarioAtivo = usuario;
            console.log(this.usuarioAtivo.userName);
            resolve();
          },
          error: (error: any) => {
            this.#toastrService.error("Erro ao carregar Usuário", "Erro!");
            console.error(error);
            reject(error);
          },
        })
        .add(() => this.#spinnerService.hide());
    });
  }

  public getEmprestimosByUserName(): void {
    this.#spinnerService.show();
    console.log(this.usuarioAtivo.userName);
    this.#emprestimoService
      .getEmprestimosByUserName(this.usuarioAtivo.userName)
      .subscribe({
        next: (emprestimos: Emprestimo[]) => {
          this.emprestimos = emprestimos;
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Erro ao buscar os empréstimos do usuario.",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  // public getAcervo(): void {
  //   this.acervoService.getAcervos().subscribe({
  //     next: (Response: Acervo[]) => {
  //       this.acervos = Response;
  //       this.acervosFiltrados = this.acervos;
  //     },
  //     error: (error: any) => {
  //       this.spinner.hide();
  //       this.toastr.error("Erro ao Carregar", "Erro!");
  //     },
  //     complete: () => this.spinner.hide(),
  //   });
  // }

  public obterStatus(emprestimo: Emprestimo): any {
    let dataAtual = new Date();
    let dataPrevistaDevolucao = emprestimo.dataPrevistaDevolucao;

    if (
      dataPrevistaDevolucao < dataAtual &&
      emprestimo.dataDevolucao == null &&
      (emprestimo.status == 2 || emprestimo.status == 4)
    ) {
      return "Em atraso";
    } else if (emprestimo.status == 1) {
      return "Aguardando aprovação da solicitação";
    } else if (emprestimo.status == 2) {
      return "Em andamento";
    } else if (emprestimo.status == 3) {
      return "Devolvido";
    } else if (emprestimo.status == 4) {
      return "Renovado";
    } else if (emprestimo.status == 5) {
      return "Não aprovado";
    } else return "-";
  }

  public formatarData(data: Date): any {
    if (data != null) {
      return formatDate(data, "dd/MM/YYYY", "en-US");
    } else {
      return null;
    }
  }
}
