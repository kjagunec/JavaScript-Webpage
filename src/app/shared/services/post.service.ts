import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Post} from "../models/post.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts : Post[] = [];
  private postSubject : BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private dataService : DataService) {
    this.refreshPosts();
  }

  refreshPosts() {
    this.dataService.getPosts().subscribe((res : {status:string, rows:Post[]}) => {
      if (res.status == 'OK') {
        this.posts = res.rows;
        this.postSubject.next([...this.posts]);
      } else console.log(res.status);
    })
  }

  getPosts() : BehaviorSubject<Post[]> {
    return this.postSubject;
  }

  addPost(post : Post) {
    this.dataService.addPost(post).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') this.refreshPosts();
      else console.log(res.status);
    })
  }

  getPost(postId : number) : Post | undefined {
    return this.posts.find((p : Post) => p.id == postId);
  }

  deletePost(postId : number) {
    this.dataService.deletePost(postId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') this.refreshPosts();
      else console.log(res.status);
    })
  }
}
