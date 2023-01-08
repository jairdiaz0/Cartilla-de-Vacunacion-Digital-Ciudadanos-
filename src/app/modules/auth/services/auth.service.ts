import { Injectable } from '@angular/core';

/** Importaciones de datos .json */
import * as dataRaw from '../../../data/users/users.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any;

  setUser(user: any): void {
    this.user = user;
  }

  getUserName(): Array<string> {
    if (this.user) {
      return [
        this.user.user.firstName,
        this.user.user.lastName.paternal,
        this.user.user.lastName.maternal,
      ];
    }
    return [];
  }

  addCardToUser(card: any) {
    if (this.user) {
      this.user.cards.push(card);
    }
  }

  getCardsUser() {
    if (this.user) {
      return this.user.cards;
    }
    return undefined;
  }

  constructor() {}

  /**Verifica si existe el token_session, en caso de existir lo elimina */
  checkSession(): void {}
  validLogin(email1: string, password1: string): boolean {
    const { users } = dataRaw;
    for (let index = 0; index < users.length; index++) {
      const {
        logIn: { email },
        logIn: { password },
      } = users[index];
      if (email1 == email && password1 == password) {
        this.user = users[index];
        return true;
      }
    }
    return false;
  }

  newUser(
    email: string,
    password: string,
    firstName: string,
    surnamePaternal: string,
    surnameMaternal: string
  ): boolean {
    const { users } = dataRaw;
    const user = {
      logIn: {
        email: email,
        password: password,
      },
      user: {
        firstName: firstName,
        lastName: {
          paternal: surnamePaternal,
          maternal: surnameMaternal,
        },
      },
      cards: [],
    };
    users.push(user);
    return true;
  }

  checkEmailUser(email1: string): boolean {
    const { users } = dataRaw;
    for (let index = 0; index < users.length; index++) {
      const {
        logIn: { email },
      } = users[index];
      if (email == email1) {
        return true;
      }
    }
    return false;
  }
}
