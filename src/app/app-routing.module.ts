import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'

import { FrontPageModule } from './front-page/front-page.module'
import { FrontPageComponent } from './front-page/front-page.component'

import { AppPage } from '../../e2e/app.po';

import { DashboardModule } from './dashboard/dashboard.module'
import { DashboardComponent } from './dashboard/dashboard.component'

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [

  {
    path: 'dash',
    component: DashboardComponent,
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuardService]
  },
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
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }