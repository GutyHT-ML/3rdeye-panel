import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Camera, StoreCameraRequest } from '../../../models/camera-interfaces';
import { CameraService } from '../../../services/camera.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  obj: any;
  cameras: Camera[] = [];

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: StoreCameraRequest,
    private fb: FormBuilder,
    private cameraSvc: CameraService,
    private notiSvc: NotificationService) { this.buildForm(); }

  ngOnInit(): void {
    this.getCameras();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm(): void{
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  sendData(): void{
    console.log(this.form)
    if(this.form.invalid){ return;}
    this.setData();
    console.log(this.form)
    this.cameraSvc.onCreateCamera(this.obj).subscribe(() => {
      this.notiSvc.openSnackBar('Creado correctamente', 3000).subscribe(() => this.dialogRef.close(true));
    }, (error: HttpErrorResponse) => {
      console.log(error)
      switch(error.status){
        case 404:
          this.notiSvc.openSnackBar('Código de cámara incorrecto', 2000).subscribe();
          break;
        case 422:
          this.notiSvc.openSnackBar('Esta cámara ya está registrada', 2000).subscribe();
          break;
        case 500:
          this.notiSvc.openSnackBar('Error del servidor', 2000).subscribe();
          break;
      }
    });
  }

  setData(): void{
    this.obj = {
      ...this.form.value
    };
  }

  getCameras(): void{
    this.cameraSvc.onUserCameras().subscribe((data) =>{
      this.cameras = data.cameras
      this.setData();
    });
  }

}
