import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HOME_LINKS, FILE_LINKS } from './temp-links';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  links = [HOME_LINKS, FILE_LINKS];
  link = this.links[0];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  linkMethod(x) {
    this.link = this.links[x]
  }
}
