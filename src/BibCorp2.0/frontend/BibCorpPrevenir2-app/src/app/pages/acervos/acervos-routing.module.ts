import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcervoDetalheComponent, AcervoEditarComponent, AcervoListaComponent, AcervosComponent } from ".";


const routes: Routes = [
  { path: "", 
    component: AcervosComponent, 
    pathMatch: "prefix" ,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista'
      },
      {
        path: 'lista',
        component: AcervoListaComponent
      },
      {
        path: 'detalhe/:id',
        component: AcervoDetalheComponent
      },
      {
        path: 'editar/:id',
        component: AcervoEditarComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcervosRoutingModule {}
