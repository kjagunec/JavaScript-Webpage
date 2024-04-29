import { Component, OnInit } from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {NavbarService} from "../shared/services/navbar.service";
import {Category} from "../shared/models/category.model";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentRoute : string = '';
  categories : Category[] = [];

  constructor(private authService:AuthService, private navbar:NavbarService, private categoryService:CategoryService) { }

  ngOnInit() {
    this.navbar.getCurrentRoute().subscribe(route => {
      this.currentRoute = route;
    })
    this.navbar.checkCurrentRoute();

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  getUsername() {
    return this.authService.getUser().username;
  }

  changeSelectedCategory(id : number) {
    this.categoryService.changeSelectedCategory(id);
  }
}
