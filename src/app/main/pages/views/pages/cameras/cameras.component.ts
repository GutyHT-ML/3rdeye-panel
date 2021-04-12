import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Camera, StoreCameraRequest, StoreCameraResponse } from '../../models/camera-interfaces';
import { Image } from '../../models/photo-interfaces';
import { CameraService } from '../../services/camera.service';
import { PhotoService } from '../../services/photo.service';
import { DialogComponent } from "./dialog/dialog.component";
@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css'],
})
export class CamerasComponent implements OnInit {
  loading = true;
  userCams: Camera[] = [];
  photos !: Image[]
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['code', 'name', 'created_at', 'actions'];
  constructor(private cameraSvc: CameraService,
    private photoSvc: PhotoService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserCameras();
    this.setData();
  }

  onObserveCamera(code: Number): void {
    this.router.navigate(['panel/views/camera', code])
  }

  onEditCamera(id: Number): void {
    console.log(id)
  }

  onSelectPhoto(photo:Image): void {
    console.log(photo)
  }

  async openDialog(): Promise<void> {
    if(await this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '40%'
    }).afterClosed().toPromise()){
      this.getUserCameras();
    }
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.userCams;
  }

  getUserCameras(): void {
    this.cameraSvc.onUserCameras().subscribe((data)=>{
        this.userCams = data.cameras
        this.loading = false
        this.setData();
      }
    )
  }
}
