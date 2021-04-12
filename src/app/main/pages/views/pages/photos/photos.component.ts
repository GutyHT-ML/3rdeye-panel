import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/auth/services/websocket.service';
import { environment } from 'src/environments/environment';
import { Camera } from '../../models/camera-interfaces';
import { CameraService } from '../../services/camera.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  code!: number;
  camera!: Camera;
  loading = true;
  videoFeed = true;
  url = `${environment.API_URL}/v1/api/repo/img/`;
  ip!: string;
  displayedColumns: string[] = ['temp', 'hum', 'date'];
  constructor(private route: ActivatedRoute, private cameraSvc: CameraService,
              private sanitizer: DomSanitizer, private wsSvc: WebSocketService,
              private notiSvc: NotificationService) {
    this.code = Number(this.route.snapshot.paramMap.get('code'));
   }

  ngOnInit(): void {
    this.getCamera(this.code);
    const images = this.wsSvc.subscribeImages();
    images.on("message", (data: any) => {
      this.getCamera(this.code);
      this.notiSvc.openSnackBar(data, 3000).subscribe();
    });
    const values = this.wsSvc.subscribeValues();
    values.on("message", (data: any) => {
      this.getCamera(this.code);
      this.notiSvc.openSnackBar(data, 3000).subscribe();
    });
    const video = this.wsSvc.subscribeVideoFeed();
    video.on("message", (data: any) => {
      this.videoFeed = true;
      this.notiSvc.openSnackBar(data, 3000).subscribe();
    })
  }

  getCamera(code: Number): void{
    this.loading = true;
    this.cameraSvc.onGetCamera(code).subscribe((data) =>{
      this.camera = data;
      this.ip = `http://${this.camera.ip}:5000/video_feed`;
      console.log(this.ip)
      this.loading = false;
      /*this.cameraSvc.onGetVideoFeed(this.camera.ip).subscribe(() => {
        this.videoFeed = true;
      }, () => {
        this.videoFeed = false;
      });*/
    });
  }

  getIP() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.ip);
  }
}
