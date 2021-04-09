import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile>{
    return this.http.get<Profile>(`${environment.API_URL}/v1/api/profile`)
  }

  updateProfile(data:Profile): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/v1/api/profile/edit`,data)
  }
}
