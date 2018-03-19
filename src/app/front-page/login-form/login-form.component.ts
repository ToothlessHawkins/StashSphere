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


  //   sessionStorage.setItem('id', data.id);
  //   // retrieving from the session
  //   var data = sessionStorage.getItem('id');
  //   console.log(data) // to see the id in the console

  attemptLogin(creds): void {
    this.userService.attemptLogin(creds)
      .subscribe(result => {
        if (result) {
          const r = JSON.stringify(result);
          sessionStorage.setItem('user', r);
          // let data = sessionStorage.getItem('user');
          // data = JSON.parse(data);
          // console.log(data.token)
          this.router.navigateByUrl('/dash');
        } else {
          this.failed = true;
          this.router.navigateByUrl('/front/login');
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
