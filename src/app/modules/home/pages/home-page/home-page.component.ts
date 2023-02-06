import { Component } from '@angular/core';
import { SessionGuard } from 'src/app/core/guards/session.guard';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private _sessionGuard: SessionGuard
    ) {}

  ngOnInit(){
  }

  getUserName(): Array<string>{
    const {firstName, surnamePaternal, surnameMaternal} = this._sessionGuard.user;
    return [firstName, surnamePaternal, surnameMaternal];
  }
}
