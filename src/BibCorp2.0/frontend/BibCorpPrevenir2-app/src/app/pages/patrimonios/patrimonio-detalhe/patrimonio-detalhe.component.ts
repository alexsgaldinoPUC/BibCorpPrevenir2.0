import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormValidator } from "../../../util/class";
import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { PatrimonioService } from "../../../services/patrimonio/patrimonio.service";
import { ToastrService } from "ngx-toastr";
import { AcervoService } from "../../../services/acervo";
import { Acervo } from "../../../shared/models/interfaces/acervo";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-patrimonio-detalhe",
  templateUrl: "./patrimonio-detalhe.component.html",
  styleUrl: "./patrimonio-detalhe.component.scss",
})
export class PatrimonioDetalheComponent implements OnInit {
  #acervoService = inject(AcervoService);
  #activevateRouter = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #patrimonioService = inject(PatrimonioService);
  #router = inject(Router);
  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public formPatrimonio = {} as FormGroup;

  public corTexto = "text-success";

  public patrimonio = {} as Patrimonio;
  public patrimonioParam: any = "";

  public editMode: Boolean = false;

  public capaPatrimonio: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvSXCxMVWmCqcYHAvsrPZXmy2OkBeGy1-fbuCX2yfV5duFlE84Bk7C_APCxidn5u9cE0&usqp=CAU";

  public get ctrF(): any {
    return this.formPatrimonio.controls;
  }

  ngOnInit() {
    this.formValidator();
    
    this.patrimonioParam = this.#activevateRouter.snapshot.paramMap.get("id");
    this.editMode = this.patrimonioParam != null ? true : false;
    console.log("ngOnInit",this.editMode )

    if (this.editMode) this.getPatrimonio();
  }

  public formValidator(): void {
    this.formPatrimonio = this.#formBuilder.group({
      patrimonioId: [""],
      isbn: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      localizacao: [""],
      sala: [""],
      coluna: [""],
      prateleira: [""],
      posicao: [""],
      dataCadastro: [""],
      dataAtualizacao: [""],
      dataIndisponibilidade: [""],
      statusTela: ["Liberado"],
    });
  }

  public fieldValidator(campoForm: FormControl): any {
    return FormValidator.checkFieldsWhithError(campoForm);
  }

  public messageReturned(nomeCampo: FormControl, nomeElemento: string): any {
    return FormValidator.returnMessage(nomeCampo, nomeElemento);
  }

  public clearForm(): void {
    this.formPatrimonio.reset();
  }

  public saveChange(): void {
    if (this.formPatrimonio.valid)
      if (!this.editMode) {
        this.novoPatrimonio();
      } else {
        this.salvarPatrimonio();
      }
  }

  public getPatrimonio(): void {
    this.#spinnerService.show();
    
    this.#patrimonioService
    .getPatrimonioById(+this.patrimonioParam)
    .subscribe({
      next: (patrimonio: Patrimonio) => {
        this.patrimonio = patrimonio;
        
        this.formPatrimonio.patchValue(this.patrimonio);
        this.ctrF.patrimonioId.setValue(this.patrimonio.id);
        console.log("------------------- getPatrimonio -------------------")
          console.log("date: ", this.patrimonio.dataCadastro)
          this.ctrF.dataCadastro.setValue(this.patrimonio.dataCadastro);
          this.patrimonio.status = false;
          this.corTexto = this.patrimonio.status
            ? "text-danegr"
            : "text-success";
          console.log(this.corTexto);
          this.ctrF.statusTela.setValue(
            this.patrimonio.status ? "Emprestado" : "Liberado"
          );

          if (patrimonio.acervo?.capaUrl)
            this.capaPatrimonio = patrimonio.acervo.capaUrl;

          console.log(patrimonio);
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao recuperar Patrimonio", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public novoPatrimonio(): void {
    this.#spinnerService.show();

    this.patrimonio = { ...this.formPatrimonio.value };

    this.patrimonio.status = false;
    this.patrimonio.dataAtualizacao = new Date().toISOString();
    this.patrimonio.dataCadastro = new Date().toISOString();

    this.#patrimonioService
      .createPatrimonio(this.patrimonio)
      .subscribe({
        next: (novoPatrimonio: Patrimonio) => {
          this.#toastrService.success("Patrimonio cadastrado!", "Sucesso!");
          this.getAcervo(this.patrimonio.isbn);
          window.location.reload;
          this.#router.navigateByUrl(
            `/pages/patrimonios/detalhe/${novoPatrimonio.id}`
          );
        },
        error: (error: any) => {
          this.#toastrService.error("Erro ao cadastrar Patrimônio", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public salvarPatrimonio(): void {
    this.#spinnerService.show();

    this.patrimonio = {
      id: this.ctrF.patrimonioId.value,
      ...this.formPatrimonio.value,
    };
    this.patrimonio.dataCadastro = new Date().toISOString();
    console.log(this.patrimonio);
    this.#patrimonioService
      .savePatrimonio(this.patrimonio)
      .subscribe({
        next: (patrimonio: Patrimonio) => {
          this.#toastrService.success("Patrimônio Atualizado!", "Sucesso!");
        },
        error: (error: any) => {
          this.#toastrService.error("Falha ao atualizar Patrimônio.", "Erro!");
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }

  public getAcervo(isbn: string): void {
    this.#spinnerService.show();

    this.#acervoService
      .getAcervoByISBN(isbn)
      .subscribe({
        next: (acervo: Acervo) => {
          if (acervo.capaUrl) this.capaPatrimonio = this.#acervoService.baseURL;
        },
        error: (error: any) => {
          this.#toastrService.error(
            "Falha ao recuperar Acervo por ISBN.",
            "Erro!"
          );
          console.error(error);
        },
      })
      .add(() => this.#spinnerService.hide());
  }
}
