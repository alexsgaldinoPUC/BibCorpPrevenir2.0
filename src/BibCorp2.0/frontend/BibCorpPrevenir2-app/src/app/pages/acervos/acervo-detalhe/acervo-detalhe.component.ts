import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, inject } from "@angular/core";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { EmprestimoModalEmprestarComponent } from "../../emprestimos";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AcervoService } from "../../../services/acervo";
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from "../../../services/usuario";
import { Usuario } from "../../../shared/models/interfaces/usuario";
import { environment } from "../../../../assets/environments";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: "app-acervo-detalhe",
  templateUrl: "./acervo-detalhe.component.html"

})
export class AcervoDetalheComponent implements OnInit {
  #acervoService = inject(AcervoService);
  #activevateRouter = inject(ActivatedRoute);
  #dialogRef = inject(MatDialog);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);
  #usuarioService = inject(UsuarioService);
  #snackBar = inject(MatSnackBar);
  @Input('rating') public rating: number = 2;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'primary';
  @Output() public ratingUpdated = new EventEmitter();
  public snackBarDuration: number = 2000;
  public ratingArr:number[] = [] as number[] ;

  public acervo = {} as Acervo;
  public usuarioAtivo = {} as Usuario;

  public acervoParam = "" as any;
  public comentarios: string = "";
  public fotoURL: string = "";

  public usuarioLogado = false;
  public disabledReservar = false;

  public abrirDialog(patrimonioId: number) {
    this.#dialogRef.open(EmprestimoModalEmprestarComponent, {
      data: {
        patrimonioId: patrimonioId,
        acervoId: this.acervo.id,
        id: "Emprestar",
      },
    });
  }

  public ngOnInit(): void {
    this.acervoParam = this.#activevateRouter.snapshot.paramMap.get("id");
    for (let i = 0; i < this.starCount; i++) {
      this.ratingArr.push(i);
    }

    this.getUserAtivo();
    this.getAcervoById();
  }

  public getUserAtivo(): void {
    this.#spinnerService.show();

    this.#usuarioService
      .getUsuarioByUserName()
      .subscribe({
        next: (usuarioAtivo: Usuario) => {
          this.usuarioAtivo = usuarioAtivo;
          this.usuarioLogado = true;
          this.fotoURL =
            this.usuarioAtivo.fotoURL === null
              ? "../../../../assets/images/not-available.png"
              : environment.fotoURL + this.usuarioAtivo.fotoURL;
        },
        error: (error: any) => {
          if (error.status == 401) this.usuarioLogado = false;
          else
            this.#toastrService.error("Falha ao recuperar usuario no sistema");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getAcervoById(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoById(+this.acervoParam)
      .subscribe({
        next: (retorno: Acervo) => {
          this.acervo = retorno;
          console.log(this.acervo);
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao carregar Acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public salvarAcervo(): void {
    this.#spinnerService.show();

    this.acervo.comentarios = this.comentarios;

    this.#acervoService
      .saveAcervo(this.acervo)
      .subscribe({
        next: (acervo: Acervo) => {
          this.acervo = acervo;
          console.log(this.acervo);
          this.#toastrService.success(
            "Comentário incluído para o acervo!",
            "Salvo!"
          );
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao salvar acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public obterStatusPatrimonio(_status: boolean): any {
    if (!this.usuarioLogado || this.usuarioAtivo.isAdmin)
      this.disabledReservar = true;
    else if (_status) this.disabledReservar = true;
    else this.disabledReservar = false;
    return _status ? "Indisponível" : "Disponível";
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.#snackBar.open('Sua avaliação ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.rating = rating;
    this.ratingUpdated.emit(rating);
    return false;
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

