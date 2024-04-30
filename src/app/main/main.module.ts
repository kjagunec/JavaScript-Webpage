import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import {RouterLink} from "@angular/router";
import {ShortenPipe} from "../shared/pipes/shorten.pipe";
import {InvertPipe} from "../shared/pipes/invert.pipe";

@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        ShortenPipe,
        InvertPipe
    ]
})
export class MainModule { }
