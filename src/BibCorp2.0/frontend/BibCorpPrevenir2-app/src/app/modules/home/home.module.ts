import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent, HomeComponent, HomePageComponent } from '../../components/home';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,

    MatIconModule,

    NgxSpinnerModule,
    SharedModule
  ],
  declarations: [HomeComponent, HomeAdminComponent, HomePageComponent],
  exports: [HomeComponent, HomeAdminComponent, HomePageComponent],
})
export class HomeModule { }
