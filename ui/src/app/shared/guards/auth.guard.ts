import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // TODO: Check if TOKEN has expired
    const currentUser = this.authService.currentAuthValue;
    if (currentUser) {
      if (!this.usersService.hasUser) {
        this.usersService.setUser();
      }
      return true;
    }

    this.router.navigate(['/login']); // , { queryParams: { returnUrl: state.url } });
    return false;
  }
}
