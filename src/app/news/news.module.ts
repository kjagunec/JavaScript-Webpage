import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsComponent} from "./news.component";
import {RouterLink} from "@angular/router";
import {InvertPipe} from "../shared/pipes/invert.pipe";



@NgModule({
  declarations: [
    NewsComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        InvertPipe
    ]
})
export class NewsModule { }
