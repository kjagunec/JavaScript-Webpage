import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  routeChange : Subject<string> = new Subject<string>();

  constructor() { }

  checkCurrentRoute() {
    this.routeChange.next(window.location.pathname);
  }

  getCurrentRoute() {
    return this.routeChange;
  }
}
