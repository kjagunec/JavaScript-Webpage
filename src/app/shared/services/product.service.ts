import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "./data.service";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Product[] = [];
  productSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private dataService : DataService) {
    this.refreshProducts();
  }

  refreshProducts() {
    this.dataService.getProducts().subscribe((res : {status:string, rows:Product[]}) => {
      if (res.status == 'OK') {
        this.products = res.rows;
        this.productSubject.next([...this.products]);
      }
    })
  }

  getProducts() : BehaviorSubject<Product[]> {
    return this.productSubject;
  }

  addProduct(product : Product) {
    this.dataService.addProduct(product).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshProducts();
      }
    })
  }

  getProduct(productId : number) : Product | undefined {
    return this.products.find((p : Product) => p.id == productId);
  }

  deleteProduct(productId : number) {
    this.dataService.deleteProduct(productId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') {
        this.refreshProducts();
      }
    })
  }
}
