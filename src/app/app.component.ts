import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarModule} from "./navbar/navbar.module";
import {MainModule} from "./main/main.module";
import {UnknownModule} from "./unknown/unknown.module";
import {LoginModule} from "./login/login.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule, MainModule, UnknownModule, LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projekt';
}
