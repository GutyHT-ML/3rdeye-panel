import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataSvc: DataService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.dataSvc.onGetCookie('token');

    if(token){
      request = this.cloneRequest(request, token);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error)))
    );
  }

  private cloneRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown>{
    return request.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
  }

  private handleError(error: HttpErrorResponse): HttpErrorResponse{
    console.warn('Ocurrió un error', error);
    if(error.status === 401){
      this.dataSvc.onRemoveAllCookies();
      this.router.navigate(['/auth']);
    }

    return error;
  }
}
