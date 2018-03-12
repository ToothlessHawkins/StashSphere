import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  credentials = {
    _username: "",
    password: ""
  }

  attemptLogin(creds): void {
    console.log(creds);
  }

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

}
