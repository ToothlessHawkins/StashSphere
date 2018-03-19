import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesService } from './files.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { AccountDashComponent } from './account-dash/account-dash.component';
import { FilesDashComponent } from './files-dash/files-dash.component';
import { DeleteDashComponent } from './delete-dash/delete-dash.component';
import { SharingDashComponent } from './sharing-dash/sharing-dash.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    HomeDashComponent,
    AccountDashComponent,
    FilesDashComponent,
    DeleteDashComponent,
    SharingDashComponent,
    DashboardComponent
  ],
  declarations: [
    HomeDashComponent,
    AccountDashComponent,
    FilesDashComponent,
    DeleteDashComponent,
    SharingDashComponent,
    DashboardComponent
  ],
  providers: [FilesService]
})
export class DashboardModule { }
