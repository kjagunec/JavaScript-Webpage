import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarModule} from "./navbar/navbar.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projekt';
}
