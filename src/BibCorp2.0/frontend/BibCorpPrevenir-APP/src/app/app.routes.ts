import { Routes } from "@angular/router";
import { BcpHomePageComponent } from "./home/components/bcp-home-page/bcp-home-page.component";


export const routes: Routes = [
  { path: "homePage", component: BcpHomePageComponent },
  { path: "**", redirectTo: "homePage", pathMatch: "full" },
];
