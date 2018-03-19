import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
let fs = require('fs');

@Component({
  selector: 'app-files-dash',
  templateUrl: './files-dash.component.html',
  styleUrls: ['./files-dash.component.css']
})
export class FilesDashComponent implements OnInit {

  raw_data = sessionStorage.getItem("user");
  clean_data = JSON.parse(this.raw_data);
  auth_token = this.clean_data.token;
  local_path: string = "assets/coconut.jpg";
  currentPath;
  viewable;
  // hardocded some test values
  // viewable = [
  //   {
  //     file_name: 'banana',
  //     isFolder: true
  //   },
  //   {
  //     file_name: 'assets/coconut.jpg',
  //     isFolder: false
  //   },
  // ];

  // get folder from api, last 2 params are optional, which will get root folder for user@token
  getFolder(token, goingto = "", here = ""): void {
    // token:<the provided login-token>,
    // folder_name: <the folder the user is clicking on>,
    // cur_path: <the path from root to the directory the user is currently in>

    let payload = {
      token: token,
      folder_name: goingto,
      cur_path: here,
    }

    console.log(payload)

    this.fileService.getFolder(payload)
      .subscribe(result => {
        if (result.files) {
          this.currentPath = result.new_path;
          this.viewable = result.files;
          console.log(this.viewable);
          console.log(this.currentPath);
          console.log(result);
        } else {
          console.log(result.message);
        }
      });
  }

  getFile(token, file, here): void {
    // token: <the provided login - token >,
    // file_name: <the name of the file the user clicked on >,
    // cur_path: <the path from root to the directory the user is in currently >
    let payload = {
      token: token,
      file_name: file,
      cur_path: here
    }
    console.log(payload)

    // for modal
    this.local_path = file;

    let name = "Test1";

    this.fileService.getFile(payload)
      .subscribe(result => {
        if (result.success) {
          // interpret file somehow - maybe let download, view if image?
          fs.writeFile(name, result.data, (err) => {
            if (err) { console.log(err) }
            else {
              console.log("something happened, now find it.")
            }
          })
          console.log(result);
        } else {
          console.log(result.message);
        }
      });
  }

  starItem(): void {
    let payload = {
      //something
    }

    console.log(payload)

    this.fileService.starItem(payload)
      .subscribe(result => {
        console.log("Item starred!")
      })
  }

  constructor(private fileService: FilesService) { }

  ngOnInit() {
    // get the root
    this.getFolder(this.auth_token);
  }

}
