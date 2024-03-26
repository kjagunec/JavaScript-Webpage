import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/models/post.model";
import {Product} from "../shared/models/product.model";
import {PostService} from "../shared/services/post.service";
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts : Post[] = [];
  categories : string[] = [];
  products : Product[] = [];

  constructor(private postService:PostService, private navbar:NavbarService) { }

  ngOnInit(): void {
    /*this.postService.getPosts().subscribe((res : Post[]) => {
      this.posts = res;
    });*/

    this.navbar.checkCurrentRoute();

    let post : Post = new Post();
    let product : Product = new Product();

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

    this.categories.push("Mlijeko");
    this.categories.push("Vrhnja");
    this.categories.push("Maslac, kajmaci i namazi");
    this.categories.push("Sirutka i mlaćenica");
    this.categories.push("Svi proizvodi");

    product.name = "Jogurt";
    product.picture = "https://static5.depositphotos.com/1016154/461/i/950/depositphotos_4616605-stock-photo-yogurt.jpg";
    this.products.push(product);

    product = new Product();
    product.name = "Mlijeko";
    product.picture = "https://media.gettyimages.com/id/594838587/photo/glass-of-milk.jpg?s=2048x2048&w=gi&k=20&c=kp71uhU_Uenr2Ox8k0c630pNqw-M6Bp3DnAvw_fl3o4=";
    this.products.push(product);

    product = new Product();
    product.name = "Sir";
    product.picture = "https://media.gettyimages.com/id/859268416/photo/cheese-chunk-isolated-on-white-background.jpg?s=2048x2048&w=gi&k=20&c=eJE-0duhWEh2THMUc2Pw7jUmOMl2fn-4g3ZXb0KlJFI=";
    this.products.push(product);
  }

}
