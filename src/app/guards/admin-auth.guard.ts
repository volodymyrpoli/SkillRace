import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUser')) {
      return Utils.isCurrentUserAdmin();
    }

    this.router.navigate(['/work'], { queryParams: { returnUrl: state.url }}).catch(console.log);
    return false;
  }

}
