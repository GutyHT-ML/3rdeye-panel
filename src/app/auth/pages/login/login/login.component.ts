import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
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
    private router: Router ) { this.buildForm() }

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
      return
    }
    this.authSvc.onLogIn(this.form.value).subscribe(()=>{
      this.router.navigate(['/panel'])
    },(error: HttpErrorResponse)=>{
      console.log(error)
    })
  }

  get f() {
    return this.form.controls;
  }
}