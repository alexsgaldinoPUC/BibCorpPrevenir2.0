import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { HttpClientModule } from '@angular/common/http';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    NgbModule
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
