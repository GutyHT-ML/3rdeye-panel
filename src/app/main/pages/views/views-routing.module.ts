import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'my_cameras', component: CamerasComponent },
  { path: 'camera/:code', component: PhotosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
