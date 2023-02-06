import { Component } from '@angular/core';

// Importaciones
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importaciones de servicios
import { AuthService } from '../../services/auth.service';

//Importaciones de clases
import { AlertClass } from '../../../../core/class/Alert.Class';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css'],
})
export class LogInPageComponent {
  formLogin: FormGroup = new FormGroup({});

  title: any;
  form: any;
  alert = new AlertClass();

  /**Método constructor */
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _userService: UserServiceService
  ) {
    this._authService.checkToken();
    this.title = {
      text: 'Cartilla Digital de Vacunación',
      class: ['h3', 'title'],
    };
    this.form = {
      title: {
        text: 'Iniciar Sesión',
        class: ['titulo', 'mt-4', 'm-md-0'],
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
        },
        button: {
          title: 'Mostrar Contraseña',
          class: ['btn', 'd-flex', 'align-items-center'],
        },
      },
      button: {
        text: 'Iniciar Sesión',
        class: ['btn', 'btn-dark', 'mb-3', 'title'],
      },
      forgotPassword: {
        text: '¿Olvidaste tu contraseña?',
        class: ['text-muted', 'd-block', 'cursor'],
      },
      signIn: {
        text: '¿No tienes una cuenta?',
        class: ['mb-2', 'text'],
        button: {
          text: 'Registrarse',
          class: ['btn', 'btn-outline-danger', 'title'],
          router: ['/', 'auth', 'SignIn'],
        },
      },
    };
    this.alert.getStatus().success.title = 'Acceso Correcto';
    this.alert.getStatus().failure.title = 'Correo y/o Contraseña Incorrectos';
    this.alert.getStatus().noValid = this.alert.getObjectToCustom(
      'Formulario no válido',
      ['alert', 'alert-danger']
    );
  }
  /**Método que se ejecuta al iniciar el componente */
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  /**Función que envia los datos para ingresar */
  async sendLogin() {
    this.alert.getStatus().flagShow = true;
    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      try {
        const { token } = await this._authService.validLogin(email, password);
        if (token) {
          this.alert.getStatus().default = this.alert.getStatus().success;
          this.router.navigate(['/', 'home']);
        }
      } catch (error) {
        this.alert.getStatus().default = this.alert.getStatus().failure;
      }
    } else {
      this.alert.getStatus().default = this.alert.getStatus().noValid;
    }
  }
}
