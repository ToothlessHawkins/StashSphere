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
  titles = ['Dashboard', 'Stash Sphere', 'Sharing Center', 'Deleted Files', 'Account Settings'];
  title = this.titles[0];
  link = this.links[0];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  linkMethod(x) {
    if (x === 0 || x === 4) {
      this.link = this.links[0];
    } else {
      this.link = this.links[1]
    }
    this.title = this.titles[x]
  }
}
