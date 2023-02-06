import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  public user?: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkToken();
  }

  constructor(private _authService: AuthService, private _route: Router) {}

  /**
   * Función que nos permite válidar el token y dar una respuesta por medio del Guard.
   * @returns
   */
  private checkToken() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const data = await this._authService.validSession();
        if (!data.error) {
          this.user = data;
          resolve(true);
        } else {
          reject(false);
          this._route.navigate(['/', 'auth']);
        }
      } catch (error) {
        console.log('Error GuardSession: ', error);
        reject(false);
        this._route.navigate(['/', 'auth']);
      }
    });
  }
}
