import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersService } from './users.service';
import { FrontPageRoutingModule } from './front-page-routing.module';

import { FrontPageComponent } from './front-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FrontPageRoutingModule,
  ],
  declarations: [
    FrontPageComponent,
    LoginFormComponent,
    SignUpFormComponent
  ],
  exports: [
    FrontPageComponent,
    LoginFormComponent,
    SignUpFormComponent
  ],
  providers: [UsersService]
})
export class FrontPageModule { }
