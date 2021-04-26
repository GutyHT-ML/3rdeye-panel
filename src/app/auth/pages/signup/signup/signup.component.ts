import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationService } from 'src/app/main/pages/views/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form !: FormGroup
  hide = true
  constructor(private fb :FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private notiSvc: NotificationService) { this.buildForm() }

  ngOnInit(): void {
  }

  signUp():void{
    if (this.form.invalid) {
      this.notiSvc.openSnackBar("Some fields are invalid",2000)
      return
    }
    this.authSvc.onSignUp(this.form.value).subscribe(
      val => {
        this.notiSvc.openSnackBar(val.message,2000)
        this.form.reset()
        this.router.navigate(["/auth/login"])
      },
      error => {
        this.notiSvc.openSnackBar("Error signing up, please try again",2000)
      }
    )
  }

  buildForm():void{
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

}
