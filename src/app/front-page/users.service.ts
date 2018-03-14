import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {



  /* ENTER URL HERE */
  private usersUrl = 'http://35.173.205.255/user/'
  private login = 'login'
  private create = 'create'

  attemptLogin(loginCreds): Observable<Response> {
    return this.http.post<Response>((this.usersUrl + this.login), loginCreds);
  }

  attemptCreateUser(newUser): Observable<Response> {
    return this.http.post<Response>((this.usersUrl + this.create), newUser);
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
