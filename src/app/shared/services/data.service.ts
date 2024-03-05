import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRootUsers : string = environment.API_URL + '/api/users';
  apiRootPosts : string = environment.API_URL + '/api/posts';
  apiRootCategories : string = environment.API_URL + '/api/users';
  apiRootProducts : string = environment.API_URL + '/api/categories';

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<Observable<{status: string, users : User[]}>>(this.apiRootUsers);
  }

  addUser(user : User) {
    return this.http.post<Observable<{status : string, insertId : number}>>(this.apiRootUsers, user);
  }

  getPosts() {
    return this.http.get<Observable<{status : string, posts : Post[]}>>(this.apiRootPosts);
  }

  addPost(post:Post) {
    return this.http.post<Observable<{status:string, insertId:number}>>(this.apiRootPosts, post);
  }

  deletePost(id:number) {
    return this.http.delete(this.apiRootPosts + `/${id}`);
  }

  editPost(post:Post) {
    return this.http.put(this.apiRootPosts, post);
  }
}
