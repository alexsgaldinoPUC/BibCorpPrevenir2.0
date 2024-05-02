import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  HomeAdminComponent,
  HomeComponent,
  HomePageComponent,
} from "./pages/home";
import {
  CadastroComponent,
  LoginComponent,
  PerfilComponent,
  UsuariosComponent,
} from "./pages/usuarios";
import {
  PatrimonioDetalheComponent,
  PatrimonioListaComponent,
  PatrimoniosComponent,
} from "./pages/patrimonios";
import {
  AcervoDetalheComponent,
  AcervoEdicaoComponent,
  AcervoListaComponent,
  AcervosComponent,
} from "./pages/acervos";
import {
  EmprestimosComponent,
  GerenciarReservasComponent,
} from "./pages/emprestimos";

const routes: Routes = [
  { path: "", redirectTo: "pages/home", pathMatch: "full" },

  { path: "acervos", redirectTo: "pages/acervos/lista", pathMatch: "full" },
  {
    path: "pages/acervos",
    component: AcervosComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "lista" },
      { path: "lista", component: AcervoListaComponent },
      { path: "detalhe/:id", component: AcervoDetalheComponent },
      { path: "editar/:id", component: AcervoEdicaoComponent },
      { path: "cadastrar", component: AcervoEdicaoComponent },
    ],
  },

  {
    path: "patrimonios",
    redirectTo: "pages/patrimonios/lista",
    pathMatch: "full",
  },
  {
    path: "pages/patrimonios",
    component: PatrimoniosComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "lista" },
      { path: "lista", component: PatrimonioListaComponent },
      { path: "detalhe/:id", component: PatrimonioDetalheComponent },
      { path: "cadastrar", component: PatrimonioDetalheComponent },
    ],
  },

  {
    path: "emprestimos",
    redirectTo: "pages/emprestimos/gerenciarReservas",
    pathMatch: "full",
  },
  {
    path: "pages/emprestimos",
    component: EmprestimosComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "gerenciarReservas" },
      { path: "gerenciarReservas", component: GerenciarReservasComponent },
      { path: "detalhe/:id", component: PatrimonioDetalheComponent },
      { path: "cadastrar", component: PatrimonioDetalheComponent },
    ],
  },

  {
    path: "usuarios",
    redirectTo: "pages/usuarios/login",
    pathMatch: "full",
  },
  {
    path: "pages/usuarios",
    component: UsuariosComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", component: LoginComponent },
      { path: "perfil", component: PerfilComponent },
      { path: "cadastro", component: CadastroComponent },
    ],
  },

  {
    path: "pages/home",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "homePage", pathMatch: "full" },
      { path: "homePage", component: HomePageComponent },
      { path: "homeAdmin", component: HomeAdminComponent },
    ],
  },

  { path: "**", redirectTo: "pages/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
