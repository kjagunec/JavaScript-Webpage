import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/models/product.model";
import {CategoryService} from "../shared/services/category.service";
import {Category} from "../shared/models/category.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  allProducts : Product[] = [];
  filteredProducts : Product[] = [];
  categories : Category[] = [];
  selectedCategoryId : number = 0;

  constructor(private navbar:NavbarService, private productService:ProductService, private categoryService:CategoryService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.categoryService.getSelectedCategoryId().subscribe(id => this.selectedCategoryId = id);

    this.productService.getProducts().subscribe(products => this.allProducts = products);
    this.productService.getFilteredProducts().subscribe(products => this.filteredProducts = products);
  }

  changeSelectedCategory(id : number) {
    this.categoryService.changeSelectedCategory(id);
  }
}
