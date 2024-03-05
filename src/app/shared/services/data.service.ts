import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRootUsers : string = environment.API_URL + '/api/users';
  apiRootPosts : string = environment.API_URL + '/api/posts';
  apiRootCategories : string = environment.API_URL + '/api/users';
  apiRootProducts : string = environment.API_URL + '/api/categories';

  constructor(private http : HttpClient) { }

  getPosts() {

  }
}
