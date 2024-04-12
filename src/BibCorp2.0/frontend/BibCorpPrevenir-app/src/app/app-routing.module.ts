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

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "pages/home" },
  {
    path: "pages/home",
    component: HomeComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "homePage" },
      { path: "homePage", component: HomePageComponent },
      { path: "homeAdmin", component: HomeAdminComponent },
    ],
  },

  {
    path: "pages/usuarios",
    component: UsuariosComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "perfil" },
      { path: "perfil", component: PerfilComponent },
      { path: "cadastro", component: CadastroComponent },
      { path: "login", component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
