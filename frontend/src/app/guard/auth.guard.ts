import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthStatus().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/']).catch(err => console.log(err));
          return false;
        }
        return true;
      })
    );
  }

}
