import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './front-page/users.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UsersService, private router: Router) { }

  canActivate() {
    if (this.userService.isValid()) {
      return true;
    } else {
      this.router.navigateByUrl('/front');
      return false;
    }
  }
}