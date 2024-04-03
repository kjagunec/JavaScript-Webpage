import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarModule} from "./navbar/navbar.module";
import {MainModule} from "./main/main.module";
import {UnknownModule} from "./unknown/unknown.module";
import {LoginModule} from "./login/login.module";
import {AuthService} from "./login/auth/auth.service";
import {ProfileModule} from "./profile/profile.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule, MainModule, UnknownModule, LoginModule, ProfileModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'projekt';

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.authService.whoAmI();
  }
}
