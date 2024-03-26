import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{

  constructor(private navbar : NavbarService) {}

  ngOnInit() {
    this.navbar.checkCurrentRoute();
  }
}
