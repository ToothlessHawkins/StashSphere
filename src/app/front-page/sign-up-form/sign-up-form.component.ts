import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
import { Router } from '@angular/router'
// import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  failed: boolean = false;
  newUser = {
    _username: "",
    password: "",
    fName: "",
    lName: "",
  }

  passwordCheck = ""
  passMatch: boolean = true;

  validatePassword() {
    this.passMatch = (this.newUser.password == this.passwordCheck) ? true : false;
  }

  createAccount(user) {
    this.userService.attemptCreateUser(user)
      .subscribe(result => {
        //console.log(result);
        if (result.success) {
          /* REROUTE TO LOGIN AFTER SUCCESSFUL CREATION */
          this.router.navigateByUrl('/front/login');
        } else {
          this.failed = true;
          this.router.navigateByUrl('/front/signup');
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
