import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/auth/services/data.service';
import { NotificationService } from 'src/app/main/pages/views/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  hide = true
  constructor(private fb: FormBuilder,
    private authSvc: AuthService,
    private dataSvc: DataService,
    private router: Router,
    private notiSvc: NotificationService ) { this.buildForm() }

  ngOnInit(): void {
  }

  buildForm() : void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  logIn() : void {
    if (this.form.invalid) {
      this.notiSvc.openSnackBar("Some fields are invalid",2000)
      return
    }
    this.authSvc.onLogIn(this.form.value).subscribe(()=>{
      this.notiSvc.openSnackBar("Welcome to Third Eye",2000)
      this.router.navigate(['panel/views/my_cameras'])
    },(error: HttpErrorResponse)=>{
      if (error.status == 403 || error.status == 400){
        this.notiSvc.openSnackBar("Incorrect email or password",2000)
      }
      console.log(error)
    })
  }

  get f() {
    return this.form.controls;
  }
}
