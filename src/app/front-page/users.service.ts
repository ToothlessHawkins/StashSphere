import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

class Reply {
  // //properties returned on success
  // files: string[];
  // new_path: string;
  //properties returned on failure
  success: string;
  message: string;
  // //files
  // data: string;
}

@Injectable()
export class UsersService {

  /* ENTER URL HERE */
  private usersUrl = 'http://35.173.205.255/user/'
  private login = 'login'
  private create = 'create'
  private del = 'delete'
  private update = 'update'

  attemptLogin(loginCreds): Observable<Reply> {
    return this.http.post<Reply>((this.usersUrl + this.login), loginCreds);
  }

  attemptCreateUser(newUser): Observable<Reply> {
    return this.http.post<Reply>((this.usersUrl + this.create), newUser);
  }

  //attemptDeleteUser(delUser): Observable<Response> {
  //  return this.http.delete<Response>((this.usersUrl + this.del), delUser);
  //}

  attemptEditUser(putUser): Observable<Reply> {
    return this.http.put<Reply>((this.usersUrl + this.update), putUser);
  }
  isValid(): boolean {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('user') != 'false') {
      return true;
    } else {
      return false;
    }
  }

  constructor(private http: HttpClient) { }

}
