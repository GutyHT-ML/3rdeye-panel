import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm !: FormGroup;
  profile!:Profile;
  constructor(private fb: FormBuilder, private profileService: ProfileService ) {
     this.buildForm()
    }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      val => {
        this.profile = val
      },
      error => {
        console.log(error)
      }
    )
  }

  edit(): void {
    this.profileService.updateProfile(this.profileForm.value).subscribe(
      val => {
        console.log(val)
      },
      error => {
        console.log(error)
      }
    )
  }

  buildForm() : void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    })
  }
}
