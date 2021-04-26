import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from '../../models/profile';
import { NotificationService } from '../../services/notification.service';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm !: FormGroup;
  profile!:Profile;
  constructor(private fb: FormBuilder, private profileService: ProfileService, private authSvc: AuthService,
    private router: Router,
    private notiSvc: NotificationService ) {
     this.buildForm();
    }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      val => {
        this.profileForm.patchValue(val);
        this.profile = val;
      },
      error => {
        console.log(error);
      }
    )
  }

  edit(): void {
    this.profileService.updateProfile(this.profileForm.value).subscribe(
      () => {
        this.notiSvc.openSnackBar("Changes saved",2000);
        window.location.reload();
      }, error => {
        this.notiSvc.openSnackBar("An error occurred",2000);
        return
      }
    );
  }

  buildForm() : void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    })
  }
}
