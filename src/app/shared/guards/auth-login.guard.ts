import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/auth/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private dataSvc: DataService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.dataSvc.onIsLoggedIn('token')){
        this.router.navigate(['/panel/views/my_cameras']);
      }
      return !this.dataSvc.onIsLoggedIn('token');
  }

}
