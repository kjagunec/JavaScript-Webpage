import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Post} from "../models/post.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts : Post[] = [];
  postSubject : BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(/*private dataService : DataService*/) {
    //this.refreshPosts();
  }

  /*refreshPosts() {
    this.dataService.getPosts().subscribe((res : {status:string, posts:Post[]}) => {
      if (res.status == 'OK') {
        this.posts = res.posts;
        this.postSubject.next([...this.posts]);
      }
    })
  }

  getPosts() : BehaviorSubject<Post[]> {
    return this.postSubject;
  }

  addPost(post : Post) {
    this.dataService.addPost(post).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshPosts();
      }
    })
  }

  getPost(postId : number) : Post | undefined {
    return this.posts.find((p : Post) => p.id == postId);
  }

  deletePost(postId : number) {
    this.dataService.deletePost(postId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') {
        this.refreshPosts();
      }
    })
  }*/
}
