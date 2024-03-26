import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  constructor(private navbar : NavbarService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();
  }
}
