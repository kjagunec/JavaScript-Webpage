import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarModule} from "./navbar/navbar.module";
import {MainModule} from "./main/main.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule, MainModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projekt';
}
