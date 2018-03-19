import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

class Reply {
  //properties returned on success
  files: string[];
  new_path: string;
  //properties returned on failure
  success: string;
  message: string;
  //files
  data: string;
}

@Injectable()
export class FilesService {

  /* ENTER URL HERE */
  private url = 'http://35.173.205.255/node/'
  private file = 'file'
  private folder = 'folder'
  private new_folder = 'new_folder'

  //Observable<specific type of response> ?
  //Observable<JSON> ?

  getFolder(payload): Observable<Reply> {
    return this.http.post<Reply>((this.url + this.folder), payload);
  }

  makeFolder(payload): Observable<Reply> {
    return this.http.post<Reply>((this.url + this.new_folder), payload);
  }

  getFile(payload): Observable<Reply> {
    return this.http.post<Reply>((this.url + this.file), payload);
  }

  constructor(private http: HttpClient) { }

}
