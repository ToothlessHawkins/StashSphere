import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'
// import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

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
    // first validate passwords


    console.log(user);
    // call api
  }


  constructor(private userService: UsersService) { }

  ngOnInit() {
    // this.userForm = new FormGroup({
    //   'username': new FormControl(this.newUser._username, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   'password': new FormControl(this.newUser.password, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   'fName': new FormControl(this.newUser.fName, Validators.required),
    //   'lName': new FormControl(this.newUser.lName, Validators.required)
    // });
  }

  // get username() { return this.userForm.get('username'); }

}
