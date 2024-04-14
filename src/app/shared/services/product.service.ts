import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {DataService} from "./data.service";
import {Product} from "../models/product.model";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products : Product[] = [];
  private productSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  addProductEmmiter : Subject<{message:string, alert:string}> = new Subject<{message:string, alert:string}>();

  constructor(private dataService : DataService) {
    this.refreshProducts();
  }

  refreshProducts() {
    this.dataService.getProducts().subscribe((res : {status:string, rows:Product[]}) => {
      if (res.status == 'OK') {
        this.products = res.rows;
        this.productSubject.next([...this.products]);
      } else console.log(res.status);
    })
  }

  getProducts() : BehaviorSubject<Product[]> {
    return this.productSubject;
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
    return this.products.find((p : Product) => p.id == productId);
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
}
