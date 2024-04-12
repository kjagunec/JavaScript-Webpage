import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";
import {Post} from "../shared/models/post.model";
import {PostService} from "../shared/services/post.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{

  posts : Post[] = [];

  constructor(private navbar:NavbarService, private postService:PostService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();

    this.postService.getPosts().subscribe(res => this.posts = res);
  }
}
