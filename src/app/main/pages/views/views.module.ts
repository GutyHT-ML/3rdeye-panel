import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PhotosComponent } from './pages/photos/photos.component';
import { DialogComponent } from './pages/cameras/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';



@NgModule({
  declarations: [ProfileComponent, CamerasComponent, PhotosComponent, DialogComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ViewsModule { }
