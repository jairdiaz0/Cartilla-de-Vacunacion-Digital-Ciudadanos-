import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private _authService: AuthService
    ) {}

  ngOnInit(){
  }

  getUserName(): Array<string>{
    return this._authService.getUserName();
  }
}
