import { NgModule } from '@angular/core';
import { FrontPageRoutingModule } from './front-page/front-page-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'

const routes: Routes = [
  {
    path: 'front',
    loadChildren: './front-page/front-page-routing.module#FrontPageRoutingModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
