import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { WebSocketService } from 'src/app/auth/services/websocket.service';
import { environment } from 'src/environments/environment';
import { Camera } from '../../models/camera-interfaces';
import { CameraService } from '../../services/camera.service';
import { NotificationService } from '../../services/notification.service';
import * as moment from 'moment';

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
  dates: string[] = [];
  camera!: Camera;
  loading = true;
  videoFeed = false;
  url = `${environment.API_URL}/v1/api/repo/img/`;
  ip!: string;
  displayedColumns: string[] = ['temp', 'hum', 'date'];
  constructor(private route: ActivatedRoute, private cameraSvc: CameraService,
              private sanitizer: DomSanitizer, private wsSvc: WebSocketService,
              private notiSvc: NotificationService, private router: Router) {
    this.code = this.route.snapshot.paramMap.get('code');
   }
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: '#FFFFFF'
      }
    },
    scales: {
      xAxes: [{
          gridLines: {
              display: false,
          },
          ticks: {
            fontColor: "#FFFFFF",
          },
      }]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

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

  ngAfterViewInit() {
    this.getCamera(this.code);
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
    this.cameraSvc.onGetCamera(code).subscribe((data) =>{
      this.camera = data;
      console.log(this.camera);
      if(!this.camera){
        this.notiSvc.openSnackBar("Invalid camera code", 3000).subscribe();
        this.router.navigate(["/panel/views/my_cameras"])
      }
      this.ip = `${this.camera?.ip}/video_feed`;
      this.loading = false;
      this.setData()
      this.temperatures = [];
      this.humiditys = [];
      this.dates = [];
      for (var value of this.camera.values){
        this.temperatures.push(value.temperature)
        this.humiditys.push(value.humidity)
        this.dates.push(moment(value.date_value).format("DD/MM/YY hh:mm:ss"),)
      }
      this.barChartData = [
        { data: this.temperatures, label: 'Temperature' },
        { data: this.humiditys, label: 'Humidity' },
      ];
      this.barChartLabels = this.dates;
      this.cameraSvc.onGetVideoFeed(this.camera?.ip).subscribe(() => {
        this.videoFeed = true;
      }, () => {
        this.videoFeed = false;
      });
    }, error => {
      this.notiSvc.openSnackBar("Invalid camera code", 3000).subscribe();
      this.router.navigate(["/panel/views/my_cameras"])
    });
  }

  getIP() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.ip);
  }
}
