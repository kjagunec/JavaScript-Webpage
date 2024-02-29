import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRootPosts = environment.API_URL + '/api/posts';
  apiRootUsers = environment.API_URL + '/api/users';

  constructor(private http : HttpClient) { }

  getPosts() {

  }
}
