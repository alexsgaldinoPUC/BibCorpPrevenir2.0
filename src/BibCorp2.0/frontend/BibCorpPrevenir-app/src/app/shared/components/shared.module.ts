import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { DrawerNavigatorComponent } from '.';
import { TitleNavigatorComponent } from './title-navigator/title-navigator.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [
    DrawerNavigatorComponent,
    TitleNavigatorComponent
  ],
  exports: [
    DrawerNavigatorComponent,
    TitleNavigatorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),

    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule

  ],
  providers: [ToastrService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
