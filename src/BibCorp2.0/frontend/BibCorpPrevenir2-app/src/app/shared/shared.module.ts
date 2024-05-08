import { AppRoutingModule } from '../app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DrawerNavigatorComponent, ModalDeleteComponent, TitleNavigatorComponent } from '.';
import { AcervoService } from '../services/acervo';
import { EmprestimoService } from '../services/emprestimo';
import { PatrimonioService } from '../services/patrimonio';
import { LoginService, UsuarioService } from '../services/usuario';

import { JwtInterceptor } from '../util/security';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';




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
    NgxMaskDirective,
    NgxSpinnerModule.forRoot({ type: "square-jelly-box"}),
    RouterModule,
    ToastrModule.forRoot(),

    MatButtonModule,
    MatCardModule,
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
    MatTooltipModule,

  ],
  exports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule,
    ToastrModule,

    MatButtonModule,
    MatCardModule,
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
    MatTooltipModule,

    DrawerNavigatorComponent,
    ModalDeleteComponent,
    TitleNavigatorComponent
  ],
  providers: [
    AcervoService,
    EmprestimoService,
    LoginService,
    PatrimonioService,
    UsuarioService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', color: 'primary' }},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },

    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideEnvironmentNgxMask()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
