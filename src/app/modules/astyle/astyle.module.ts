import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AStyleRoutingModule } from './astyle-routing.module';
import { ShowPageComponent } from './show-page/show-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShowPageComponent
  ],
  imports: [
    CommonModule,
    AStyleRoutingModule,
    SharedModule
  ]
})
export class AStyleModule { }
