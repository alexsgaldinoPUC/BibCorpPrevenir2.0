import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent, HomeComponent, HomePageComponent } from "./pages/home";
import { CadastroComponent, LoginComponent, PerfilComponent, UsuariosComponent } from "./pages/usuarios";

const routes: Routes = [
  { path: "", redirectTo: "pages/home", pathMatch: "full" },
  {
    path: "pages/acervos",
    loadChildren: () =>
      import("./pages/acervos/acervos.module").then((m) => m.AcervosModule),
  },
  {
    path: "pages/patrimonios",
    loadChildren: () =>
      import("./pages/patrimonios/patrimonios.module").then(
        (m) => m.PatrimoniosModule
      ),
  },
  {
    path: "pages/emprestimos",
    loadChildren: () =>
      import("./pages/emprestimos/emprestimos.module").then(
        (m) => m.EmprestimosModule
      ),
  },
  { path: 'pages/usuarios', component: UsuariosComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', component: LoginComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'cadastro', component: CadastroComponent }
    ]
  },

  { path: 'pages/home', 
    component: HomeComponent, 
    children: [
      { path: "", redirectTo: "homePage", pathMatch: "full" },
      { path: "homePage", component: HomePageComponent },
      { path: "homeAdmin", component: HomeAdminComponent }
    ] 
  },

  { path: "**", redirectTo: "pages/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
