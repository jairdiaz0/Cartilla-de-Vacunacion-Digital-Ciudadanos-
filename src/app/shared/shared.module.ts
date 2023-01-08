import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { InputFormComponent } from './components/input-form/input-form.component';



@NgModule({
  declarations: [
    NavBarComponent,
    AlertComponent,
    InputFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    AlertComponent,
    InputFormComponent
  ]
})
export class SharedModule { }
