import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormValidator } from "../../../util/class";
import { NgxSpinnerService } from "ngx-spinner";
import { PatrimonioService } from "../../../services/patrimonio";
import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { AcervoService } from "../../../services/acervo";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-acervo-edicao",
  templateUrl: "./acervo-edicao.component.html",
  styleUrls: ["./acervo-edicao.component.scss"],
})
export class AcervoEdicaoComponent {
  #acervoService = inject(AcervoService);
  #activevateRouter = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #patrimonioService = inject(PatrimonioService);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public formAcervo = {} as FormGroup;

  public acervo = {} as Acervo;

  public patrimonio = {} as Patrimonio;
  public patrimonios = [] as Patrimonio[];

  public acervoParam: any = "";

  public editMode: Boolean = false;

  public capaPatrimonio: string =
    "../../../../../assets/images/capaDefault.png";

  public get ctrF(): any {
    return this.formAcervo.controls;
  }

  ngOnInit() {
    this.acervoParam = this.#activevateRouter.snapshot.paramMap.get("id");
    this.editMode = this.acervoParam != null ? true : false;

    this.formValidator();

    if (this.editMode) {
      this.getAcervo();
    }
  }

  public formValidator(): void {
    this.formAcervo = this.#formBuilder.group({
      acervoId: [""],
      isbn: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      qtdeAcervos: ["0"],
      genero: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      titulo: ["", Validators.required],
      subTitulo: [""],
      autor: ["", Validators.required],
      resumo: [
        "",
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(5000),
        ],
      ],
      capaUrl: ["", Validators.required],
      anoPublicacao: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      dataCriacao: [new Date().toISOString().slice(0, 10).replace(/-/g, "")],
      editora: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      edicao: ["", Validators.maxLength(15)],
      qtdPaginas: ["0"],
      qtdeDisponivel: ["0"],
      qtdeEmprestada: ["0"],
    });
  }

  public fieldValidator(campoForm: FormControl): any {
    return FormValidator.checkFieldsWhithError(campoForm);
  }

  public messageReturned(nomeCampo: FormControl, nomeElemento: string): any {
    return FormValidator.returnMessage(nomeCampo, nomeElemento);
  }

  public clearForm(): void {
    this.formAcervo.reset();
  }

  public saveChange(): void {
    if (this.formAcervo.valid)
      if (!this.editMode) {
        this.novoAcervo();
      } else {
        this.salvarAcervo();
      }
  }

  public getAcervo(): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoById(+this.acervoParam)
      .subscribe({
        next: (acervo: Acervo) => {
          this.acervo = acervo;

          this.formAcervo.patchValue(this.acervo);
          this.ctrF.acervoId.setValue(this.acervo.id);
          this.getPatrimonios();

          if (this.acervo.capaUrl) this.capaPatrimonio = this.acervo.capaUrl;
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao recuperar Acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public novoAcervo(): void {
    this.#spinnerService.show();

    this.acervo = { ...this.formAcervo.value };

    this.acervo.dataCriacao = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    this.#acervoService
      .getAcervoByISBN(this.ctrF.isbn.value)
      .subscribe({
        next: (acervo: Acervo) => {
          if (acervo == null) {
            this.criarAcervo();
          } else {
            this.#toastrService.warning("O ISBN já existe", "Alerta!");
          }
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Falha ao verificar ISBN do acervo",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public criarAcervo(): void {
    this.#acervoService
      .createAcervo(this.acervo)
      .subscribe({
        next: (novoAcervo: Acervo) => {
          this.#toastrService.success("Acervo cadastrado!", "Sucesso!");
          window.location.reload;
          this.#router.navigateByUrl(`/acervos/edicao/${novoAcervo.id}`);
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao cadastrar Acervo", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public updateAcervoIdPatrimonio(patrimonio: Patrimonio): void {
    this.#patrimonioService.savePatrimonio(patrimonio).subscribe({
      next: (patrimonio: Patrimonio) => {},
      error: (error: any) => {
        this.#toastrService.error("Falha ao atualizar patrimonios", "Erro!");
        console.error(error);
      },
    });
  }

  public salvarAcervo(): void {
    this.#spinnerService.show();

    this.acervo = { id: this.ctrF.acervoId.value, ...this.formAcervo.value };

    this.#acervoService
      .saveAcervo(this.acervo)
      .subscribe({
        next: (acervo: Acervo) => {
          this.#toastrService.success("Acervo atualizado!", "Sucesso!");
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao atualizar Arcervo.", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getPatrimonios(): void {
    this.#spinnerService.show();

    this.#patrimonioService
      .getPatrimoniosByISBN(this.ctrF.isbn.value)
      .subscribe({
        next: (patrimonios: Patrimonio[]) => {
          if (patrimonios.length != 0) {
            this.patrimonios = patrimonios;
            this.ctrF.qtdeAcervos.setValue(this.patrimonios.length);
            if (!this.editMode) this.getGoogleBook(this.ctrF.isbn.value);
          } else
            this.#toastrService.error(
              "Não existe patrimônio cadastrado para o ISBN informado",
              "Erro!"
            );
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao recuperar Patrimonios ", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getGoogleBook(isbn: string): void {
    this.#acervoService
      .getGoogleBooks(isbn)
      .subscribe({
        next: (book: Acervo) => {
          if (book != null) {
            this.acervo = book;
            this.formAcervo.patchValue(this.acervo);
          }
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Falha ao recuperar Acervo do Google Books ",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
