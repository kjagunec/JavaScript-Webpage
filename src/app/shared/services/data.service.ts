import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post.model";
import {User} from "../models/user.model";
import {Category} from "../models/category.model";
import {Product} from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiRootUsers : string = environment.API_URL + '/api/users';
  private apiRootPosts : string = environment.API_URL + '/api/posts';
  private apiRootCategories : string = environment.API_URL + '/api/categories';
  private apiRootProducts : string = environment.API_URL + '/api/products';

  constructor(private http : HttpClient) { }

  //users
  getUsers() {
    return this.http.get<{status:string, rows:User[]}>(this.apiRootUsers);
  }

  addUser(user : User) {
    return this.http.post<{status:string, insertId:number}>(this.apiRootUsers, user);
  }

  deleteUser(id : number) {
    return this.http.delete<{status:string, affectedRows:number}>(this.apiRootUsers + `/${id}`);
  }

  editUser(user : User) {
    return this.http.put(this.apiRootUsers, user);
  }

  //posts
  getPosts() {
    return this.http.get<{status : string, rows : Post[]}>(this.apiRootPosts);
  }

  addPost(post : Post) {
    return this.http.post<{status:string, insertId:number}>(this.apiRootPosts, post);
  }

  deletePost(id : number) {
    return this.http.delete<{status:string, affectedRows:number}>(this.apiRootPosts + `/${id}`);
  }

  editPost(post : Post) {
    return this.http.put(this.apiRootPosts, post);
  }

  //categories
  getCategories() {
    return this.http.get<{status:string, rows:Category[]}>(this.apiRootCategories);
  }

  addCategory(category : Category) {
    console.log("add category" + category.name)
    return this.http.post<{status:string, insertId:number}>(this.apiRootCategories, category);
  }

  deleteCategory(id : number) {
    return this.http.delete<{status:string, affectedRows:number}>(this.apiRootCategories + `/${id}`);
  }

  editCategory(category : Category) {
    return this.http.put(this.apiRootCategories, category);
  }

  //products
  getProducts() {
    return this.http.get<{status:string, rows:Product[]}>(this.apiRootProducts);
  }

  addProduct(product : Product) {
    return this.http.post<{status:string, insertId:number}>(this.apiRootProducts, product);
  }

  deleteProduct(id:number) {
    return this.http.delete<{status:string, affectedRows:number}>(this.apiRootProducts + `/${id}`);
  }

  editProduct(product : Product) {
    return this.http.put(this.apiRootProducts, product);
  }
}
