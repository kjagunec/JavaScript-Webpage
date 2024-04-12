import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/models/post.model";
import {Product} from "../shared/models/product.model";
import {PostService} from "../shared/services/post.service";
import {NavbarService} from "../shared/services/navbar.service";
import {Category} from "../shared/models/category.model";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts : Post[] = [];
  categories : Category[] = [];
  products : Product[] = [];

  constructor(private postService:PostService, private categoryService:CategoryService, private navbar:NavbarService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res : Post[]) => this.posts = res);

    this.categoryService.getCategories().subscribe((res : Category[]) => this.categories = res);

    this.navbar.checkCurrentRoute();

    let product : Product = new Product();

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
