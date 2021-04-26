import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from '../shared/guards/auth-login.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [AuthLoginGuard]},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [AuthLoginGuard]},
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule), canActivate: [AuthLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
