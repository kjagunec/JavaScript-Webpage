import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/models/post.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts : Post[] = [];

  constructor() { }

  ngOnInit(): void {
    this.posts = [];
    let post : Post = new Post();

    post.id = 1;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/21_I15.png";
    post.title = "Saileach";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt interdum aliquam. Maecenas id felis eu sapien auctor consectetur nec. ";
    this.posts.push(post);

    post = new Post();
    post.id = 2;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/23_I11.png";
    post.title = "Svjećni Vitez";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tincidunt erat, mollis suscipit urna. Nam mollis metus a ullamcorper faucibus. Duis feugiat erat justo, nec elementum tortor porttitor facilisis. ";
    this.posts.push(post);

    post = new Post();
    post.id = 3;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/34_i04.png";
    post.title = "Ryu";
    post.text = "Eblanus";
    this.posts.push(post);
  }

}
