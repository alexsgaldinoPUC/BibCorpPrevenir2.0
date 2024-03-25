import { Routes } from '@angular/router';
import { BcpHomePageComponent } from './homes';
import { LoginComponent, RegisterComponent, UsuarioComponent } from './usuarios';


export const routes: Routes = [
  { path: "", redirectTo: "usuarios/login", pathMatch: "full" },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  {
    path: "usuarios",
    component: UsuarioComponent,
    children: [

    ],
  },

  { path: "homePage", component: BcpHomePageComponent },

  { path: "**", redirectTo: "homePage", pathMatch: "full" },
];
