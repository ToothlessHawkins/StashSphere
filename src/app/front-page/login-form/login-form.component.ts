import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  failed: boolean = false;
  credentials = {
    _username: "",
    password: ""
  }

  attemptLogin(creds): void {
    //console.log("The credentials you are attempting to login with:");
    //console.log(creds);
    this.userService.attemptLogin(creds)
      .subscribe(result => {
        //console.log("The result of the attemptLogin function:");
        //console.log(result);
        if (result) {
          /* REROUTE AFTER SUCCESSFUL LOGIN */
          //console.log("Successful login!");
          this.router.navigateByUrl('#');
        } else {
          this.failed = true;
          this.router.navigateByUrl('/login');
        }
      });
  }

  constructor(
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
