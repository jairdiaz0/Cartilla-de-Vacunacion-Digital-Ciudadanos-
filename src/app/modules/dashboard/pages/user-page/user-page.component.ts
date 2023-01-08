import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import * as dataRaw from '../../../../data/cards/cards.json';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  cards:any;

  constructor(
    private _authService: AuthService
  ){ }

  ngOnInit(){
    this.cards = this._authService.getCardsUser();
  }

  // "user": {
  //   "curp": curp.value,
  //   "firstName": firstName.value,
  //   "lastName": {
  //     "paternal": surnamePaternal.value,
  //     "maternal": surnameMaternal.value
  //   },
  //   "birthDay": {
  //     "day": date.getDay(),
  //     "month": date.getMonth(),
  //     "year": date.getFullYear()
  //   }

}
