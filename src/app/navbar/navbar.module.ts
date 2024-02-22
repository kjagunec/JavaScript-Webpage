import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class NavbarModule { }
