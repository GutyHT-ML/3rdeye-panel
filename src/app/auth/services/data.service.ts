import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor(private cookieSvc: CookieService) { }
  onSaveCookie(name: string, content: any): void{
    this.onSetCookie(name, content);
  }

  onGetCookie(name: string): string{
    return this.cookieSvc.get(name);
  }

  onRemoveCookie(name: string): void{
    this.cookieSvc.delete(name);
  }

  onRemoveAllCookies(): void{
    this.cookieSvc.deleteAll();
  }

  onIsLoggedIn(name: string): boolean{
    return this.cookieSvc.check(name);
  }

  private onSetCookie(name: string, content: any): void{
    if (environment.production){
      this.cookieSvc.set(name, content, undefined, undefined, undefined, true, 'None');
    }else{
      this.cookieSvc.set(name, content, undefined, undefined, undefined, false, 'Strict');
    }
  }
}
