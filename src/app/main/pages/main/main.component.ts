import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Camera } from '../views/models/camera-interfaces';
import { CameraService } from '../views/services/camera.service';
import Ws from '@adonisjs/websocket-client';
import { NotificationService } from '../views/services/notification.service';
import { DataService } from 'src/app/auth/services/data.service';
import { WebSocketService } from 'src/app/auth/services/websocket.service';
import { ProfileService } from '../views/services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tabs = [
    {title: 'Profile', route: './views/profile'},
    {title: 'My cameras', route: './views/my_cameras'},
  ]
  userCams: Camera[] = [];
  ws!: any;
  chat!: any;
  messages: string[] = [];
  msg!: string;
  username: string = "Username";

  @Input()
  isToggled !: boolean

  @Input()
  route:String = ''
  showFiller = false;

  constructor(private router: Router,
    private authSvc: AuthService,
    private cameraSvc: CameraService,
    private wsSvc: WebSocketService,
    private profileService: ProfileService) {
   }
  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      val => {
        this.username = val.username;
      },
      error => {
        console.log(error);
      }
    );
    this.getUserCameras();
  }

  logOut():void{
    this.authSvc.onLogOut()
    this.router.navigate(['/auth'])
  }

  getUserCameras(): void {
    this.cameraSvc.onUserCameras().subscribe((data)=>{
        this.userCams = data.cameras
      }
    )
  }
}
