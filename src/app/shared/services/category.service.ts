import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "./data.service";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[] = [];
  categorySubject : BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private dataService : DataService) {
    this.refreshCategories();
  }

  refreshCategories() {
    this.dataService.getCategories().subscribe((res : {status:string, rows:Category[]}) => {
      if (res.status == 'OK') {
        this.categories = res.rows;
        this.categorySubject.next([...this.categories]);
      }
    })
  }

  getCategories() : BehaviorSubject<Category[]> {
    return this.categorySubject;
  }

  addCategory(category : Category) {
    this.dataService.addCategory(category).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshCategories();
      }
    })
  }

  getCategory(categoryId : number) : Category | undefined {
    return this.categories.find((c : Category) => c.id == categoryId);
  }

  deleteCategory(categoryId : number) {
    this.dataService.deleteCategory(categoryId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') {
        this.refreshCategories();
      }
    })
  }
}
