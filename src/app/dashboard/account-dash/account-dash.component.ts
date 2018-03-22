import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../front-page/users.service';

@Component({
  selector: 'app-account-dash',
  templateUrl: './account-dash.component.html',
  styleUrls: ['./account-dash.component.css']
})
export class AccountDashComponent implements OnInit {
  raw_data = sessionStorage.getItem('user');
  data = JSON.parse(this.raw_data);
  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  getUser() {
    this.raw_data = sessionStorage.getItem('user');
    this.data = JSON.parse(this.raw_data);
  }

  editUser(v) {
    if (v === 'un') {
      // get new username
      const un = prompt('Edit Username:', this.data.details._username)
      //console.log('username', this.data.details._username);
      if (un != null && un != this.data.details._username) {
        // confirm password
        const pw = prompt(un + '\nconfirm password:', )
        // verify password
        const verify = {
          _username: this.data.details._username,
          password: pw
        }
        //
        this.userService.attemptLogin(verify)
          .subscribe(result => {
            console.log(result);
            if (result) {
              const r = JSON.stringify(result);
              // updater sessionStorage
              sessionStorage.setItem('user', r);
              // update local userdata
              this.getUser();
              // call the api
              this.updateInfo([pw, un],0)

            } else {
              alert('wrong pw')
            }
          })
      }
    }
    if (v === 'pw') {
      console.log('change password');
    }
    if (v === 'fl') {
      console.log('change firs and last name');
    }
  }

  updateInfo(v, k) {
    const a = {
      token: this.data.token,
      _username: k === 0 ? v[1] : this.data._username,
      password: v[0],
      fName: k === 1 ? v[1] : this.data.details.fName,
      lName: k === 1 ? v[2] : this.data.details.lName
    }

    this.userService.attemptEditUser(a)
      .subscribe(result => {
          console.log('updated')
       })
  }
    

}
