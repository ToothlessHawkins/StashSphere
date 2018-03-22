import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FilesService } from './files.service';

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

  raw_data = sessionStorage.getItem('user');
  data = JSON.parse(this.raw_data);

  constructor(
    private FilesService: FilesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.raw_data = sessionStorage.getItem('user');
    this.data = JSON.parse(this.raw_data);
  }

  clearSes() {
    sessionStorage.setItem('user', 'false');
  }

  uploadFile(event) {

    const fileEvent: FileList = event.target.files;
    const file: File = fileEvent[0];
    console.log(file);

    let formData: FormData = new FormData();



    let payload = {
      token: this.data.token,
      u_path: '',
      owner: this.data.details._username,
      file: file
    }
    //console.log(payload)
    formData.append('token', this.data.token);
    formData.append('u_path', '');
    formData.append('owner', this.data.details._username);
    formData.append('file', file);


    console.log(formData)
    this.FilesService.uploadFile(formData)
      .subscribe(result => {
        
        console.log('RESULT', result);
        if (result) {
          console.log('uploaded?')
        } else {
          alert('wrong pw')
        }
      })
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
