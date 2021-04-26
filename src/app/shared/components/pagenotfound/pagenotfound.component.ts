import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/auth/services/data.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private dataSvc:DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(): void {
    const token = this.dataSvc.onGetCookie('token')
    if(token){
      this.router.navigate(['/panel/views/my_cameras'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

}
