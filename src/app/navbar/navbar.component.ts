import { Component, OnInit } from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentRoute : string = '';

  constructor(private authService:AuthService, private navbar:NavbarService) { }

  ngOnInit() {
    this.navbar.getCurrentRoute().subscribe(route => {
      this.currentRoute = route;
    })
    this.navbar.checkCurrentRoute();
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
}
