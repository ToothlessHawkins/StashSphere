import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontPageRoutingModule } from './front-page-routing.module';

import { FrontPageComponent } from './front-page.component';


@NgModule({
  imports: [
    CommonModule,
    FrontPageRoutingModule
  ],
  declarations: [
    FrontPageComponent
  ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
