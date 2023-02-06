import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}

  getUserInfo() {
    return this.sendToken().toPromise();
  }

  private sendToken(): Observable<any> {
    const token = this._cookieService.get(environment.tokenName);
    return this._httpClient.post(`${environment.url}/users/getUser`, {token});
  }

  addNewCard(card:any){
    return this.sendNewCard(card).toPromise();
  }
  private sendNewCard(card:any){
    const token = this._cookieService.get(environment.tokenName);
    const body = {
      token,
      card
    }
    return this._httpClient.post(`${environment.url}/users/addNewCard`, body);
  }
}
