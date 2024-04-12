import { Injectable, inject } from '@angular/core';
import { environment } from '../../../assets/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Usuario } from '../../shared/models/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  #http = inject(HttpClient)

  baseURL = environment.apiURL + 'Uploads/'

  public salvarFotoUsuario(file: File[]): Observable<Usuario> {
    const fileUpload = file[0] as File;
    const formData = new FormData();

    formData. append('file', fileUpload);

    return this.#http
    .post<Usuario>(`${this.baseURL}upload-user-photo`, formData)
    .pipe(take(1));
  }
}
