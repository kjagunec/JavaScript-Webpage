import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {User} from "../shared/models/user.model";
import {NavbarService} from "../shared/services/navbar.service";
import {Post} from "../shared/models/post.model";
import {PostService} from "../shared/services/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : User | null = new User();
  posts : Post[] = []

  constructor(private authService:AuthService, private navService:NavbarService, private postService:PostService) {}

  ngOnInit() {
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

    this.navService.checkCurrentRoute();

    this.authService.userChange.subscribe(res => {

      this.user = res;
      /*if (this.user) {

        if (this.user.admin) this.postService.getPosts().subscribe(posts => this.posts = posts);
        else this.postService.getPosts().subscribe(posts => this.posts = posts.filter(p => {
          if(this.user) p.idUsers = this.user.id
        }));

      }*/


    });
  }

  isAdmin() : boolean {
    return this.authService.isAdmin();
  }

}
