import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertClass } from 'src/app/core/class/Alert.Class';
import { CustomValidators } from 'src/app/core/uitilities/CustomValidators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['../log-in-page/log-in-page.component.css'],
})
export class SignInPageComponent {
  formLogin: FormGroup = new FormGroup({});

  title: any;
  form: any;
  alert = new AlertClass();

  /**Método constructor */
  constructor(private _authService: AuthService, private router: Router) {
    this.alert.getStatus().success.title = 'Registro Correcto';
    this.alert.getStatus().failure.title =
      'Se ha producido un error inesperado';
    this.alert.getStatus().sameEmail = this.alert.getObjectToCustom(
      'Email ya registrado',
      ['alert', 'alert-danger']
    );
    this.alert.getStatus().noSamePassword = this.alert.getObjectToCustom(
      'Las contraseñas no coinciden',
      ['alert', 'alert-danger']
    );
    this.alert.getStatus().noValid = this.alert.getObjectToCustom(
      'Datos del formulario no válidos',
      ['alert', 'alert-danger']
    );
    // this.alert.
    this.title = {
      text: 'Cartilla Digital de Vacunación',
      class: ['h3', 'title'],
    };
    this.form = {
      title: {
        text: 'Registro de Usuario',
        class: ['titulo'],
      },
      email: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Correo Electrónico',
        },
        input: {
          class: ['form-control', 'text', 'default'],
          type: 'email',
          formControl: 'email',
        },
      },
      firstName: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Nombre (s)',
        },
        input: {
          class: ['form-control', 'text', 'default'],
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
          class: ['form-control', 'text', 'default'],
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
          class: ['form-control', 'text', 'default'],
          type: 'text',
          formControl: 'surnameMaternal',
        },
      },
      password: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Contraseña',
        },
        input: {
          class: ['form-control', 'text', 'default'],
          type: 'password',
          formControl: 'password',
          flagShow: false,
        }
      },
      passwordC: {
        class: ['col-12'],
        label: {
          class: ['text', 'title'],
          text: 'Contraseña',
        },
        input: {
          class: ['form-control', 'text', 'default'],
          type: 'password',
          formControl: 'passwordC',
          flagShow: false,
        },
        button: {
          title: 'Mostrar Contraseña',
          class: ['btn'],
        },
      },
      button: {
        text: 'Registrarse',
        class: ['btn', 'btn-dark', 'mb-3', 'title'],
      },
      logIn: {
        text: '¿Ya tienes una cuenta?',
        class: ['mb-2', 'text'],
        button: {
          text: 'Iniciar Sesión',
          class: ['btn', 'btn-outline-danger', 'title'],
          router: ['/', 'auth'],
        },
      },
    };
  }
  /**Método que se ejecuta al iniciar el componente */
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setLower,
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper,
      ]),
      surnamePaternal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper,
      ]),
      surnameMaternal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidators.setUpper,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      passwordC: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  /**Función que envia los datos para ingresar */
  sendSignIn() {
    if (this.formLogin.valid) {
      this.alert.getStatus().flagShow = true;
      const {
        email,
        password,
        passwordC,
        firstName,
        surnamePaternal,
        surnameMaternal,
      } = this.formLogin.controls;
      if (password.value === passwordC.value) {
        if (!this._authService.checkEmailUser(email.value)) {
          if (
            this._authService.newUser(
              email.value,
              password.value,
              firstName.value,
              surnamePaternal.value,
              surnameMaternal.value
            )
          ) {
            this.alert.getStatus().default = this.alert.getStatus().success;
            this.router.navigate(['/', 'auth']);
          }
          this.alert.getStatus().default = this.alert.getStatus().failure;
        }
        this.alert.getStatus().default = this.alert.getStatus().sameEmail;
      }
      this.alert.getStatus().default = this.alert.getStatus().noSamePassword;
    } else {
      this.alert.getStatus().default = this.alert.getStatus().noValid;
    }
  }
}
