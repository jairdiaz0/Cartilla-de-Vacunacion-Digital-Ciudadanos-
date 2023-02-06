import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

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
    // this.cards = this._authService.getCardsUser();
  }

}
