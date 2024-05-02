import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { NgxSpinnerService } from "ngx-spinner";
import { UsuarioService } from "../../../services/usuario";
import { ToastrService } from "ngx-toastr";
import { Emprestimo } from "../../../shared/models/interfaces/emprestimo";
import { EmprestimoService } from "../../../services/emprestimo";

@Component({
  selector: "app-gerenciarReservas",
  templateUrl: "./gerenciarReservas.component.html",
  styleUrls: ["./gerenciarReservas.component.scss"],
})
export class GerenciarReservasComponent {
  #emprestimoService = inject(EmprestimoService);
  #formBuilder = inject(FormBuilder);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);

  public formReservasFiltro = {} as FormGroup;

  public usuarioAtivo = {} as Usuario;

  public emprestimos = [] as Emprestimo[];

  public get ctrF(): any {
    return this.formReservasFiltro.controls;
  }

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
  private filtroListado = "";

  // //----------------------------------------------FILTROS--------------------------------------------------
  public get filtroLista(): string {
    return this.filtroListado;
  }

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
  //   private acervoService: AcervoService,
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

  // public abrirDialogRenovacao(
  //   emprestimoId: number,
  //   acervoTitulo: string,
  //   dataPrevistaDevolucao: Date
  // ) {
  //   this.dialogRef.open(ModalRenovarComponent, {
  //     data: {
  //       emprestimoId: emprestimoId,
  //       acervoTitulo: acervoTitulo,
  //       dataPrevistaDevolucao: dataPrevistaDevolucao,
  //       id: "Renovar",
  //     },
  //   });
  // }

  // public abrirDialogAlteracao(emprestimoId: number, localDeColetaAtual: string) {
  //   this.dialogRef.open(AlterarLocalComponent, {
  //     data: {
  //       emprestimoId: emprestimoId,
  //       localDeColetaAtual: localDeColetaAtual,
  //       id: "Alterar",
  //     },
  //   });
  // }

  public ngOnInit(): void {
    this.validation();
    this.getUsuarioAtivo();
    //   // this.getPatrimonios();
    //   this.getAcervo();

    //   this.usuarioLogado = this.usuarioAtivo !== null;
  }

  private validation(): void {
    this.formReservasFiltro = this.#formBuilder.group({
      opcaoPesquisa: ["Todos"],
      argumento: [""],
    });
  }

  public getUsuarioAtivo(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuarioAtivo: Usuario) => {
          this.usuarioAtivo = { ...usuarioAtivo };
          this.getEmprestimos();
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao logar no sistema");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getEmprestimos(): void {
    this.#spinnerService.show();

    this.#emprestimoService
      .getEmprestimosByUserName(this.usuarioAtivo.userName)
      .subscribe({
        next: (empresitmo: Emprestimo[]) => {
          this.emprestimos = empresitmo;
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Erro ao buscar os empréstimos do usuario.",
            "Erro!"
          );
          console.log(error);
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

  // public obterStatus(emprestimo: Emprestimo): any {
  //   let dataAtual = new Date()
  //   let dataPrevistaDevolucao = emprestimo.dataPrevistaDevolucao;

  //   if (dataPrevistaDevolucao < dataAtual &&
  //     emprestimo.dataDevolucao == null && (emprestimo.status == 2 || emprestimo.status == 4)
  //   ) { return "Em atraso";}
  //     else if (emprestimo.status == 1) {
  //     return "Aguardando aprovação da solicitação";
  //   } else if (emprestimo.status == 2) {
  //     return "Em andamento";
  //   } else if (emprestimo.status == 3) {
  //     return "Devolvido";
  //   } else if (emprestimo.status == 4) {
  //     return "Renovado";
  //   } else if (emprestimo.status == 5) {
  //     return "Não aprovado";
  //   } else return "-";
  // }

  // public formatarData(data: Date): any{
  //   if (data != null){
  //     var dataFormatada = formatDate(data, "dd/MM/YYYY","en-US")
  //   } else{
  //     dataFormatada = null
  //   }
  //   return dataFormatada
  // }
}
