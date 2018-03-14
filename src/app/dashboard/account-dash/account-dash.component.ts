import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-dash',
  templateUrl: './account-dash.component.html',
  styleUrls: ['./account-dash.component.css']
})
export class AccountDashComponent implements OnInit {
  raw_data = sessionStorage.getItem('user');
  data = JSON.parse(this.raw_data);
  constructor() { }

  ngOnInit() {
  }

}
