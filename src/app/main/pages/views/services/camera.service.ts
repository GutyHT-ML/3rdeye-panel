import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera, StoreCameraRequest, StoreCameraResponse, UserCamsResponse } from "../models/camera-interfaces";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  onGetCamera(code: Number): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/v1/api/camera/${code}`);
  }

  onCreateCamera(data: StoreCameraRequest): Observable<StoreCameraRequest> {
    return this.http.post<any>(`${environment.API_URL}/v1/api/camera/create`, data);
  }

  onUserCameras(): Observable<UserCamsResponse>{
    return this.http.get<UserCamsResponse>(`${environment.API_URL}/v1/api/camera/mycamera`)
  }

  onCreateUserCamera(data: StoreCameraRequest): Observable<StoreCameraResponse> {
    return this.http.post<StoreCameraResponse>(`${environment.API_URL}/v1/api/camera/create`, data)
  }

  onGetVideoFeed(url: string): Observable<any>{
    return this.http.get<any>(`${url}/video`);
  }
}
