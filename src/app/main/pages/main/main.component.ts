import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tabs = [
    {title: 'Perfil', route: './views/profile'},
    {title: 'Mis camaras y fotos', route: './views/cameras'},
  ]

  @Input()
  isToggled !: boolean

  @Input()
  route:String = ''
  showFiller = false;

  constructor(private router: Router,
    private authSvc: AuthService) {
   }
  
  ngOnInit(): void {
  }

  logOut():void{
    this.authSvc.onLogOut()
    this.router.navigate(['/auth'])
  }
}
