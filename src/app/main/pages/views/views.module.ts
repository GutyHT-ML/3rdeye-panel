import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { CamerasComponent } from './pages/cameras/cameras.component';


@NgModule({
  declarations: [ProfileComponent, CamerasComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
