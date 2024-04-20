import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent, HomeComponent, HomePageComponent } from "./pages/home";
import { CadastroComponent, LoginComponent, PerfilComponent, UsuariosComponent } from "./pages/usuarios";
import { PatrimonioDetalheComponent, PatrimonioListaComponent, PatrimoniosComponent } from "./pages/patrimonios";

const routes: Routes = [
  { path: "", redirectTo: "pages/home", pathMatch: "full" },
  {
    path: "pages/acervos",
    loadChildren: () =>
      import("./pages/acervos/acervos.module").then((m) => m.AcervosModule),
  },
  {
    path: "pages/patrimonios", component: PatrimoniosComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'lista'},
      { path: 'lista', component: PatrimonioListaComponent },
      { path: 'detalhe/:id', component: PatrimonioDetalheComponent },
      { path: 'cadastrar', component: PatrimonioDetalheComponent },
    ]
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
