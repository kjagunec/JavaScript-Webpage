import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {DataService} from "./data.service";
import {Product} from "../models/product.model";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private filteredProducts : Product[] = [];
  private allProducts : Product[] = [];
  private allProductsSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.allProducts);
  private filteredProductsSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.filteredProducts);
  addProductEmmiter : Subject<{message:string, alert:string}> = new Subject<{message:string, alert:string}>();

  constructor(private dataService:DataService, private categoryService:CategoryService) {
    this.refreshProducts();

    this.categoryService.getSelectedCategoryId().subscribe(id => {

      if (id != 0) {
        this.filteredProducts = this.allProducts.filter(p => p.idCategories == id);
      } else {
        this.filteredProducts = [...this.allProducts];
      }
      this.filteredProductsSubject.next([...this.filteredProducts]);

    });
  }

  refreshProducts() {
    this.dataService.getProducts().subscribe((res : {status:string, rows:Product[]}) => {
      if (res.status == 'OK') {

        this.allProducts = res.rows;
        this.allProductsSubject.next([...this.allProducts]);

        let categoryId : number = this.categoryService.getSelectedCategoryId().value;
        if (categoryId != 0) {
          this.filteredProducts = this.allProducts.filter(p => p.idCategories == categoryId);
        } else {
          this.filteredProducts = [...this.allProducts];
        }
        this.filteredProductsSubject.next([...this.filteredProducts]);

      } else {
        console.log(res.status);
      }
    })
  }

  getProducts() : BehaviorSubject<Product[]> {
    return this.allProductsSubject;
  }

  addProduct(product : Product) {
    this.dataService.addProduct(product).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshProducts();
        this.addProductEmmiter.next({message: 'Proizvod uspješno dodan!', alert: 'alert-success'});
      }
      else {
        console.log(res.status);
        this.addProductEmmiter.next({message: res.status, alert: 'alert-danger'});
      }
    })
  }

  getProduct(productId : number) : Product | undefined {
    return this.allProducts.find((p : Product) => p.id == productId);
  }

  deleteProduct(productId : number) {
    this.dataService.deleteProduct(productId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') this.refreshProducts();
      else console.log(res.status);
    })
  }

  editProduct(product : Product) {
    this.dataService.editProduct(product).subscribe((res : {status:string, changedRows:number}) => {
      if (res.status == 'OK') this.refreshProducts();
      else console.log(res.status);
    })
  }

  getFilteredProducts() : BehaviorSubject<Product[]> {
    return this.filteredProductsSubject;
  }
}
