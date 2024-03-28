import { Routes, mapToCanActivate } from "@angular/router";
import { BcpHomePageComponent } from "./homes";
import { CanActivateGuard } from "./shared";

export const routes: Routes = [
  { path: "", redirectTo: "usuarios/login", pathMatch: "full" },

  {
    path: "login",
    loadComponent: () =>
      import("./usuarios/components/login/login.component").then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./usuarios/components/register/register.component").then(
        (c) => c.RegisterComponent
      ),
  },

  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: mapToCanActivate([CanActivateGuard]),
    children: [
      {
        path: "usuarios",
        loadComponent: () =>
          import("./usuarios/components/usuario/usuario.component").then(
            (c) => c.UsuarioComponent
          ),
      },
    ],
  },

  { path: "homePage", component: BcpHomePageComponent },

  { path: "**", redirectTo: "homePage", pathMatch: "full" },
];
