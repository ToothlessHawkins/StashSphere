import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersService {

  /* ENTER URL HERE */
  private usersUrl = 'SOMETHING/user/'
  private login = 'login'
  private create = 'create'

  // attemptLogin(loginCreds): Observable<something>

  constructor(private http: HttpClient) { }

}
