import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../../util';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CanActivateGuard {
  #router = inject(Router);
  #toastrService = inject(ToastrService);

  canActivate(): boolean {
    if (localStorage.getItem(Constants.LOCAL_STORAGE_NAME) !== null)
      return true;

    this.#toastrService.info("Conta não autenticada!", "Info!");
    this.#router.navigate(["/users/login"]);

    return false;
  }
}
