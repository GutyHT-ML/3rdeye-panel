import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginData, TokenResponse, SignUpData, SignUpResponse } from "src/app/auth/models/auth-interfaces";
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private dataSvc: DataService) { }
  onSignUp(signUpData: SignUpData):Observable<SignUpResponse>{
    return this.http.post<SignUpResponse>(`${environment.API_URL}/v1/auth/signup`, signUpData)
  }

  onLogIn(data: LoginData): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${environment.API_URL}/v1/auth/login`, data)
    .pipe(
      tap((data: TokenResponse) => {
        this.dataSvc.onSaveCookie('token', data.token.token);
        this.dataSvc.onSaveCookie('refreshToken', data.token.refreshToken);
        this.dataSvc.onSaveCookie('id', data.user.id);
        this.dataSvc.onSaveCookie('username', data.user.username);
      })
    );
  }

  onLogOut():void{
    this.dataSvc.onRemoveAllCookies()
  }
}
