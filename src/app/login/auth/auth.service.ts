import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user? : User | null;
  private token?  : string | null;
  private authUrl : string = environment.API_URL + '/authenticate';
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient:HttpClient, private router:Router) { }

  login(credentials : {email:string, password:string}) {

    this.httpClient.post<{status:string, user:User, token:string}>(this.authUrl, credentials).subscribe((res : {status:string, user:User, token:string}) => {

      if (res.status == 'OK') {

        this.user = res.user;
        this.token = res.token;
        sessionStorage.setItem('token', this.token);
        this.authChange.next(true);
        this.errorEmitter.next('');
        this.router.navigate(['/']);

      } else {

        this.errorEmitter.next(res.status);

      }

    })
  }

  logout() {

    this.user = null;
    this.token = null;
    sessionStorage.removeItem('token');
    this.authChange.next(false);

  }

  getUser() {

    if (this.user) return {...this.user}
    else return null;

  }

  getToken() {

    if (this.token) return this.token;
    else {
      this.token = sessionStorage.getItem('token');
      return this.token;
    }

  }

  isAuthenticated() {
    return this.user != null;
  }

  whoAmI() {

    if (this.getToken()) {
      this.httpClient.get<{status:string, user?:User}>(environment.API_URL + '/api/me').subscribe((res : {status:string, user?:User}) => {

        if (res.status == 'OK') {

          this.user = res.user;
          this.authChange.next(true);

        } else console.log(res.status);

      })
    }
  }
}
