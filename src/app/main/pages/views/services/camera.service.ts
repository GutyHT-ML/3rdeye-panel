import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreCameraRequest, StoreCameraResponse, UserCamsResponse } from "../models/camera-interfaces";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  onUserCameras(): Observable<UserCamsResponse>{
    return this.http.get<UserCamsResponse>(`${environment.API_URL}/v1/api/camera/mycamera`)
  }

  onCreateUserCamera(data: StoreCameraRequest): Observable<StoreCameraResponse> {
    return this.http.post<StoreCameraResponse>(`${environment.API_URL}/v1/api/camera/create`, data)
  }
}
