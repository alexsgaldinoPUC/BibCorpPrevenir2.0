import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BcpTitleBarComponent } from '../../../shared';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [BcpTitleBarComponent, RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit{
  #router = inject(Router)

  public ngOnInit(): void  {
  console.log("bbbbbbbb")

  }

  public showCabecalho(): boolean {
    return this.#router.url != '/login' && this.#router.url != '/register'
  }
}
