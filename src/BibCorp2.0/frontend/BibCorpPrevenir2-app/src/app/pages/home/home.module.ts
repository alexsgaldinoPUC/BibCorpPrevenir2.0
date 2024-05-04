import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { SharedModule } from "../../shared";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent, HomePageComponent],
  imports: [ReactiveFormsModule, SharedModule],
})
export class HomeModule {}
