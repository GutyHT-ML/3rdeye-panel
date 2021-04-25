import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
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
  code!: any;
  camera!: Camera;
  loading = true;
  videoFeed = false;
  url = `${environment.API_URL}/v1/api/repo/img/`;
  ip!: string;
  displayedColumns: string[] = ['temp', 'hum', 'date'];
  constructor(private route: ActivatedRoute, private cameraSvc: CameraService,
              private sanitizer: DomSanitizer, private wsSvc: WebSocketService,
              private notiSvc: NotificationService) {
    this.code = this.route.snapshot.paramMap.get('code');
   }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70, 75, 80, 90], label: 'PHP' },
    { data: [50, 48, 47, 49, 44, 40], label: '.Net' },
    { data: [40, 30, 28, 25, 22, 20], label: 'Java' },
  ];
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
    console.log(code);
    this.cameraSvc.onGetCamera(code).subscribe((data) =>{
      this.camera = data;
      this.ip = `${this.camera?.ip}/video_feed`;
      this.loading = false;
      this.cameraSvc.onGetVideoFeed(this.camera?.ip).subscribe(() => {
        this.videoFeed = true;
      }, () => {
        this.videoFeed = false;
      });
    });
  }

  getIP() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.ip);
  }
}
