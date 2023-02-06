import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}
  /**Función que nos retorna la promesa de validar el token */
  validSession() {
    return this.validToken().toPromise();
  }
  /**Función que nos permite validar el token ingresado (Especializado para el Guard) */
  private validToken(): Observable<any> {
    const token = this.checkToken();
    return this._httpClient.post(`${environment.url}/users/getUser`, { token });
  }

  /**Función que nos permite eliminar el token de sesión */
  deleteToken() {
    this._cookieService.delete(environment.tokenName, '/');
  }

  /**Función que nos permite revisar si el token se sesión esta activo en las cookies */
  checkToken() {
    const token = this._cookieService.get(environment.tokenName);
    return token;
  }

  /**Función que nos permite enviar las credenciales y validar el logIn */
  validLogin(email: String, password: String) {
    return this.sendCredentials(email, password).toPromise();
  }

  /**Nos permite verificar si existe el usuario, en caso de existir se pone el tokken_session */
  private sendCredentials(email: String, password: String): Observable<any> {
    const body = { email, password };
    return this._httpClient.post(`${environment.url}/auth/logIn`, body).pipe(
      tap((responseOK: any) => {
        const { token } = responseOK;
        if (token) {
          this._cookieService.set(environment.tokenName, token, undefined, '/');
        }
      })
    );
  }

  /**Función que nos permite enviar las credenciales para la creación de un nuevo usuario */
  newUser(
    email: string,
    password: string,
    firstName: string,
    surnamePaternal: string,
    surnameMaternal: string
  ) {
    const user = {
      email,
      password,
      firstName,
      surnamePaternal,
      surnameMaternal,
    };
    return this.sendNewUser(user).toPromise();
  }

  /**Método que nos permite enviar las credenciales a la API */
  private sendNewUser(user: any): Observable<any> {
    return this._httpClient.post(`${environment.url}/auth/signIn`, user);
  }
}
