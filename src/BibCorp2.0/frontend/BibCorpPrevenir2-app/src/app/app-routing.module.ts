import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, HomePageComponent } from './components/home';
import { LoginComponent, UsuarioComponent } from './components/usuario';
import { RegisterComponent } from './components/usuario/register';

const routes: Routes = [
  { path: "", redirectTo: "usuarios/login", pathMatch: "full" },
  { path: "home", redirectTo: "home/homepage", pathMatch: "full" },
  { path: "usuarios", redirectTo: "usuarios/perfil", pathMatch: "full" },

  // {
  //   path: "",
  //   runGuardsAndResolvers: "always",
  //   canActivate: mapToCanActivate([CanActivateGuard]),
  //   children: [
  //     { path: "usuarios", component: UsuarioComponent, children: [
  //       { path: "perfil", component: PerfilComponent },
  //     ]},
  //   ],
  // },

  { path: "usuarios", component: UsuarioComponent, children: [
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent}
  ]},

  { path: "home", component: HomeComponent, children: [
    { path: "homepage", component: HomePageComponent }
  ]},

  { path: "**", redirectTo: "home/homepage", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
