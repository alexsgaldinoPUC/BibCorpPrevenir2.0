import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
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
