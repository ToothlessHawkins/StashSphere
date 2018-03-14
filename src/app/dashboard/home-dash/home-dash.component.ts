import { Component, OnInit } from '@angular/core';

declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.css']
})
export class HomeDashComponent implements OnInit {
  btn = ['Hide','Hide'];
  constructor() { }

  ngOnInit() {
  }

  toggleHome(x) {
    let tbl = ['.show-fav-tbl', '.show-recent-tbl']

    if (this.btn[x] === 'Hide') {
      this.btn[x] = 'Show';
    } else {
      this.btn[x] = 'Hide'
    }

    $(tbl[x]).toggle();
  }
}
