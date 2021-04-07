import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    private authSvc: AuthService) { this.buildForm }

  ngOnInit(): void {
  }
  
  signUp():void{
    if (this.form.invalid) {
      return
    }
    this.authSvc.onSignUp(this.form.value).subscribe(()=>{
      this.router.navigate(['/panel'])
    },(error: HttpErrorResponse)=>{
      console.log(error)
    })

  }

  buildForm():void{
    this.form = this.fb.group([
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
  
    ])
  }
  
}
