import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from "src/app/shared/components/pagenotfound/pagenotfound.component";
const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'panel', loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
