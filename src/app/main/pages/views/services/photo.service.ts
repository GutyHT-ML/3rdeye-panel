import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPhotosResponse } from '../models/photo-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  onGetUserPhotos():Observable<UserPhotosResponse>{
    return this.http.get<UserPhotosResponse>(`${environment.API_URL}/v1/api/photos/myphotos`)
  }
}
