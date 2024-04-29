import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/models/post.model";
import {Product} from "../shared/models/product.model";
import {PostService} from "../shared/services/post.service";
import {NavbarService} from "../shared/services/navbar.service";
import {Category} from "../shared/models/category.model";
import {CategoryService} from "../shared/services/category.service";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts : Post[] = [];
  categories : Category[] = [];
  allProducts : Product[] = [];
  filteredProducts : Product[] = [];
  selectedCategoryId: number = 0;

  constructor(private postService:PostService,
              private categoryService:CategoryService,
              private navbarService:NavbarService,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.navbarService.checkCurrentRoute();

    this.postService.getPosts().subscribe((res : Post[]) => this.posts = res);

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.categoryService.getSelectedCategoryId().subscribe(id => this.selectedCategoryId = id);

    this.productService.getProducts().subscribe(products => this.allProducts = products);
    this.productService.getFilteredProducts().subscribe(products => this.filteredProducts = products);
  }

  changeSelectedCategory(id: number) {
    this.categoryService.changeSelectedCategory(id);
  }
}
