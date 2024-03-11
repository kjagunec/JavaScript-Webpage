import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../shared/models/post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  posts : Post[] = [];
  post : Post | undefined = new Post();

  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    let id = 0;
    if (idString != null)
      id = Number.parseInt(idString);

    let post : Post = new Post();

    post.id = 1;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/21_I15.png";
    post.title = "Title ipsum";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt interdum aliquam. Maecenas id felis eu sapien auctor consectetur nec. ";
    this.posts.push(post);

    post = new Post();
    post.id = 2;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/23_I11.png";
    post.title = "Title2";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tincidunt erat, mollis suscipit urna. Nam mollis metus a ullamcorper faucibus. Duis feugiat erat justo, nec elementum tortor porttitor facilisis. ";
    this.posts.push(post);

    post = new Post();
    post.id = 3;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/34_i04.png";
    post.title = "Title3";
    post.text = "text3";
    this.posts.push(post);
    this.posts.push(post);

    this.post = this.posts.find((p : Post) => p.id == id);
  }
}
