import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrl: './unknown.component.css'
})
export class UnknownComponent implements OnInit{

  constructor(private navbar : NavbarService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();
  }
}
