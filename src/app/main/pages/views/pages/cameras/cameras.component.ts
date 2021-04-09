import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Camera, StoreCameraRequest, StoreCameraResponse } from '../../models/camera-interfaces';
import { Photo } from '../../models/photo-interfaces';
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
  userCams !: Camera[]
  photos !: Photo[]
  displayedColumns: string[] = ['code', 'name', 'created_at', 'actions'];
  constructor(private cameraSvc: CameraService,
    private photoSvc: PhotoService,
    private router: Router,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getUserCameras()
    this.getPhotos()
  }

  onObserveCamera(id: Number): void {
    console.log(id)
  }

  onEditCamera(id: Number): void {
    console.log(id)
  }

  onSelectPhoto(photo:Photo): void {
    console.log(photo)
  }

  openDialog():void {
    let camera:StoreCameraRequest = {code: '',name: ''}
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%',
      data: camera
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.cameraSvc.onCreateUserCamera(camera).subscribe(() => {
        this.loading = true
        this.getUserCameras()
      }, (e) => {
        console.log(e)
        this.loading = false
      })
    }, (e) => {
      this.loading = false
      console.log(e)
    })
  }

  getPhotos(): void {
    // this.photos = [
    //   {
    //     id: 1,
    //     camera_id: 1,
    //     route: 'https://media.discordapp.net/attachments/823463559400128512/823597345772929034/IMG_20210221_182555.jpg?width=666&height=499',
    //     date_photo: new Date(),
    //     created_at: '01-04-2002'
    //   },
    //   {
    //     id: 1,
    //     camera_id: 1,
    //     route: 'https://media.discordapp.net/attachments/823463559400128512/823597345772929034/IMG_20210221_182555.jpg?width=666&height=499',
    //     date_photo: new Date(),
    //     created_at: '01-04-2002'
    //   },
    //   {
    //     id: 1,
    //     camera_id: 1,
    //     route: 'https://media.discordapp.net/attachments/823463559400128512/824089451155292170/IMG_20210323_191335.jpg?width=888&height=499',
    //     date_photo: new Date(),
    //     created_at: '01-04-2002'
    //   },
    //   {
    //     id: 1,
    //     camera_id: 1,
    //     route: 'https://media.discordapp.net/attachments/823463559400128512/823597345772929034/IMG_20210221_182555.jpg?width=666&height=499',
    //     date_photo: new Date(),
    //     created_at: '01-04-2002'
    //   },

    // ]
    this.photoSvc.onGetUserPhotos().subscribe((x)=>{
      this.photos = x.data
      this.loading = false;
    }, (x) =>{
      console.log(x)
      this.router.navigate(['/panel'])
    })
  }
  getUserCameras(): void {
    this.cameraSvc.onUserCameras().subscribe(
      (x)=>{
        this.userCams = x.cameras
        this.loading = false
        console.log(this.userCams)
      },
      (x) =>{
        console.log(x)
        this.router.navigate(['/panel'])
      }
    )
  }
}
