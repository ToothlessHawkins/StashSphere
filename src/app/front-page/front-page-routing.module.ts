import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './front-page.component';
import { LoginFormComponent } from './login-form/login-form.component'
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'signup',
    component: SignUpFormComponent,
  }
]

export const frontPageRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [frontPageRouting],
  exports: [RouterModule],
  declarations: []
})
export class FrontPageRoutingModule { }
