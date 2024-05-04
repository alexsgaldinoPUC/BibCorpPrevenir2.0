import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { formatDate } from "@angular/common";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { FormValidator } from "../../../util/class";

import { Patrimonio } from "../../../shared/models/interfaces/patrimonio";
import { Acervo } from "../../../shared/models/interfaces/acervo";

import { AcervoService } from "../../../services/acervo";
import { PatrimonioService } from "../../../services/patrimonio";

@Component({
  selector: "app-patrimonio-detalhe",
  templateUrl: "./patrimonio-detalhe.component.html",
})
export class PatrimonioDetalheComponent implements OnInit {
  #activevateRouter = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);

  #acervoService = inject(AcervoService);
  #patrimonioService = inject(PatrimonioService);

  #spinnerService = inject(NgxSpinnerService);
  #toastrService = inject(ToastrService);

  public formPatrimonio = {} as FormGroup;

  public corTexto = "text-success";

  public patrimonio = {} as Patrimonio;
  public patrimonioParam: any = "";
  public acervo = {} as Acervo;

  public editMode: boolean = false;

  public capaPatrimonio: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvSXCxMVWmCqcYHAvsrPZXmy2OkBeGy1-fbuCX2yfV5duFlE84Bk7C_APCxidn5u9cE0&usqp=CAU";

  public get ctrF(): any {
    return this.formPatrimonio.controls;
  }

  ngOnInit() {
    this.formValidator();

    this.patrimonioParam = this.#activevateRouter.snapshot.paramMap.get("id");
    this.editMode = this.patrimonioParam != null ? true : false;

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

          this.corTexto = this.patrimonio.status
            ? "text-danegr"
            : "text-success";

          this.ctrF.statusTela.setValue(
            this.patrimonio.status ? "Emprestado" : "Liberado"
          );

          if (patrimonio.acervo?.capaUrl)
            this.capaPatrimonio = patrimonio.acervo.capaUrl;
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

    this.patrimonio.dataAtualizacao = new Date().toISOString();
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
}
