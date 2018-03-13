import { NgModule } from '@angular/core';
// import { FrontPageRoutingModule } from './front-page/front-page-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'

import { FrontPageModule } from './front-page/front-page.module'
import { FrontPageComponent } from './front-page/front-page.component'

import { LoginFormComponent } from './front-page/login-form/login-form.component'
import { AppPage } from '../../e2e/app.po';

const routes: Routes = [
  {
    path: 'front',
    component: FrontPageComponent,
    loadChildren: () => FrontPageModule
  },
  {
    path: '',
    redirectTo: '/front',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
