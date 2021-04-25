import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  code!: any;
  temperatures: number[] = [];
  temperature: number= 0;
  humiditys: number[] = [];
  humidity: number= 0;
  dates: Date[] = [];
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
  public barChartLabels: Label[] = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.temperatures, label: 'Temperature' },
    { data: this.humiditys, label: 'Humidity' },
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
  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.camera.values;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getCamera(code: Number): void{
    this.loading = true;
    console.log(code);
    this.cameraSvc.onGetCamera(code).subscribe((data) =>{
      this.camera = data;
      this.ip = `${this.camera?.ip}/video_feed`;
      this.loading = false;
      this.setData()
      for (var value of this.camera.values){
        if(value.temperature != this.temperature || value.humidity != this.humidity){
          this.temperatures.push(value.temperature)
          this.humiditys.push(value.humidity)
          this.temperature = value.temperature
          this.humidity = value.humidity
        }
        this.dates.push(value.date_value)
      }
      console.log(this.temperatures, "temperatura")
      console.log(this.humiditys, "humedad")
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
