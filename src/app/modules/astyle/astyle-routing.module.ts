import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowPageComponent } from './show-page/show-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AStyleRoutingModule { }
