import { routes } from "./app.routes";

import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from "@angular/core";

import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideToastr } from "ngx-toastr";

import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor } from "./shared";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
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
  ],
};
