import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    HomeAdminComponent,
    HomePageComponent
  ],
  imports: [
    ReactiveFormsModule,

    SharedModule
  ]
})
export class HomeModule { }
