import { routes } from "./app.routes";

import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";


import { provideToastr } from "ngx-toastr";
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown'

import { JwtInterceptor } from "./shared";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideToastr({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressBar: true,
    }),
    { provide: LOCALE_ID, useValue: 'pr-BR' },
    [importProvidersFrom([BrowserAnimationsModule])],
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
  ],
};
