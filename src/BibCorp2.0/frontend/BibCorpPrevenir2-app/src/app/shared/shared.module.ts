import { AppRoutingModule } from '../app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DrawerNavigatorComponent, ModalDeleteComponent, TitleNavigatorComponent } from '.';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ 
    DrawerNavigatorComponent, TitleNavigatorComponent, ModalDeleteComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexModule,
    NgbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),

    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    
  ],
  exports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexModule,
    NgbModule,
    NgxSpinnerModule,
    ToastrModule,

    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,

    DrawerNavigatorComponent,
    ModalDeleteComponent,
    TitleNavigatorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
