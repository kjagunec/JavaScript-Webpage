import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../shared/models/post.model";
import {PostService} from "../shared/services/post.service";
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  posts : Post[] = [];
  post : Post = new Post();

  constructor(private route:ActivatedRoute, private postService:PostService, private router:Router, private navbar:NavbarService) {}

  ngOnInit(): void {
    this.navbar.checkCurrentRoute();

    let idString : string | null = this.route.snapshot.paramMap.get('id');
    let id : number = 0;
    if (idString != null)
      id = Number.parseInt(idString);

    let post = this.postService.getPost(id);

    if (post) this.post = post;
    else this.router.navigate(['unknown']);

  }
}
