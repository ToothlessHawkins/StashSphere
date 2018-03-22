import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
// import { saveAs } from 'file-saver/dist/FileSaver';
// import * as _ from 'file-saver';
// import 'file-saver';
// import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';


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
  currentPath: string;
  viewable;//: child[];

  //payload when file is clicked but not downlaoded yet
  toDown;


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

    // console.log(payload)

    this.fileService.getFolder(payload)
      .subscribe(result => {
        if (result.files) {
          this.currentPath = result.new_path;
          this.viewable = result.files;
          // console.log(this.viewable);
          // console.log(this.currentPath);
          // console.log(result);
        } else {
          console.log(result.message);
        }
      });
  }

  getFile(token, file, here): void {
    // token: <the provided login - token >,
    // file_name: <the name of the file the user clicked on >,
    // cur_path: <the path from root to the directory the user is in currently >
    this.toDown = {
      token: token,
      file_name: file,
      cur_path: here
    }
    console.log(this.toDown)
    // for modal
    this.local_path = file;
  }

  downloadFile(payload) {
    //temp set name
    let name = "Test1";

    this.fileService.getFile(payload)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          // interpret file somehow - maybe let download, view if image?
          // fs.writeFile(name, result.data, (err) => {
          //   if (err) { console.log(err) }
          //   else {
          //     console.log("something happened, now find it.")
          //   }
          // })
          const blob = new Blob([result.data], { type: 'text/plain' })
          // _.saveAs(blob, name);
          FileSaver.saveAs(blob, name);

          console.log(result);
        } else {
          console.log(result.success);
          console.log(result.message);
        }
      });
  }

  //might not be needed
  // private saveToFileSystem(response) {
  //   const contentDispositionHeader: string = response.headers.get('Content-Disposition');
  //   const parts: string[] = contentDispositionHeader.split(';');
  //   const filename = parts[1].split('=')[1];
  //   const blob = new Blob([response._body], { type: 'text/plain' });
  //   saveAs(blob, filename);
  // }

  starItem(): void {
    let payload = {
      // TODO: this
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
