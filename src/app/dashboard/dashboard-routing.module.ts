import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { AccountDashComponent } from './account-dash/account-dash.component';
import { DeleteDashComponent } from './delete-dash/delete-dash.component';
import { FilesDashComponent } from './files-dash/files-dash.component';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { SharingDashComponent } from './sharing-dash/sharing-dash.component';


const dashRoutes: Routes = [
 
      {
        path: '',
        component: HomeDashComponent
      },
      {
        path: 'account',
        component: AccountDashComponent
      },
      {
        path: 'files',
        component: FilesDashComponent
      },
      {
        path: 'files/delete',
        component: DeleteDashComponent
      },
      {
        path: 'files/sharing',
        component: SharingDashComponent
      }
];

export const dashRouting = RouterModule.forChild(dashRoutes);

@NgModule({
  imports: [dashRouting],
  exports: [RouterModule],
  declarations: []
})
export class DashboardRoutingModule { }
