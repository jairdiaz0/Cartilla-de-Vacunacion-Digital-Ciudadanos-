/**Importaciones */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**Importaciones de clases */
import { AlertClass } from 'src/app/core/class/Alert.Class';
import { CustomValidators } from 'src/app/core/uitilities/CustomValidators';

/**Importaciones de servicios */
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-new-card-page',
  templateUrl: './new-card-page.component.html',
  styleUrls: ['./new-card-page.component.css']
})
export class NewCardPageComponent {
  formNewCard: FormGroup = new FormGroup({});
  form: any;
  alert = new AlertClass();

  constructor(
    private _authService: AuthService
  ){
    this.form = {
      title: {
        text: 'Registro de Nueva Cartilla',
        class: ['titulo','mt-4', 'text-center'],
      },
      CURP: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'CURP De La Nueva Cartilla',
        },
        input: {
          class: ['form-control', 'text', 'pages'],
          type: 'text',
          formControl: 'curp',
        },
      },
      firstName: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Nombre (s)',
        },
        input: {
          class: ['form-control', 'text', 'pages'],
          type: 'text',
          formControl: 'firstName',
        },
      },
      surnamePaternal: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Apellido Paterno',
        },
        input: {
          class: ['form-control', 'text', 'pages'],
          type: 'text',
          formControl: 'surnamePaternal',
        },
      },
      surnameMaternal: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Apellido Materno',
        },
        input: {
          class: ['form-control', 'text', 'pages'],
          type: 'text',
          formControl: 'surnameMaternal',
        },
      },
      birthDay: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Fecha de Nacimiento',
        },
        input: {
          class: ['form-control', 'text', 'pages', 'text-center'],
          type: 'date',
          formControl: 'birthDay',
        },
      },
    }
    this.alert.getStatus().success.title = 'Alta de Cartilla Correcta';
    this.alert.getStatus().failure.title = 'Ocurrió un error inesperado';
  }
  erCURP:string = "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}";
  ngOnInit(){
    this.formNewCard = new FormGroup({
      curp: new FormControl('', [
        Validators.required,
        Validators.minLength(18),
        Validators.maxLength(18),
        CustomValidators.setUpper,
        Validators.pattern(`(${this.erCURP})|(${this.erCURP.toLowerCase()})`)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper
      ]),
      surnamePaternal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper
      ]),
      surnameMaternal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper
      ]),
      birthDay: new FormControl('', [Validators.required, CustomValidators.dateValidator(100)])
    });
  }

  sendData(){
    this.alert.getStatus().flagShow = true;
    if(this.formNewCard.valid){
      const {curp, firstName, surnamePaternal, surnameMaternal, birthDay} = this.formNewCard.controls;
      let date = new Date(birthDay.value);
      const card = {
        "user": {
          "curp": curp.value,
          "firstName": firstName.value,
          "lastName": {
            "paternal": surnamePaternal.value,
            "maternal": surnameMaternal.value
          },
          "birthDay": {
            "day": date.getDay(),
            "month": date.getMonth(),
            "year": date.getFullYear()
          }
        },
        "cards": []
      };
      this.formNewCard.reset();
      this._authService.addCardToUser(card);
      this.alert.getStatus().default = this.alert.getStatus().success;
    }else{
      this.alert.getStatus().default = this.alert.getStatus().failure;
    }
  }
}
