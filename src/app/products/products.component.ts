import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private navbar : NavbarService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();
  }
}
