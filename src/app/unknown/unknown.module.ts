import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownComponent } from './unknown.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    UnknownComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class UnknownModule { }
