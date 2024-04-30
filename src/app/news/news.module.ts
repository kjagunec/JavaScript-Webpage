import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsComponent} from "./news.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    NewsComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class NewsModule { }
