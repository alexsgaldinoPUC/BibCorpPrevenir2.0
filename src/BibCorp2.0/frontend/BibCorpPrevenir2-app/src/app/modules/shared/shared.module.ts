import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent, TitleBarComponent } from '../../components/shared';

import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MatAccordion,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    NgbDropdownModule,
    NgxSpinnerModule.forRoot({  
      type: "square-jelly-box"
    }),
    ToastrModule.forRoot(),
  ],
  declarations: [NavBarComponent, TitleBarComponent],
  exports: [NavBarComponent, TitleBarComponent]
})
export class SharedModule { }
