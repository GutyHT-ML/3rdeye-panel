import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tabs = [
    {title: 'Perfil', route: 'profile'},
    {title: 'Mis camaras', route: 'mycamera'},
  ]

  @Input()
  isToggled !: boolean

  @Input()
  route:String = ''
  showFiller = false;

  constructor(private router: Router) {
   }
  
  ngOnInit(): void {
  }
}
