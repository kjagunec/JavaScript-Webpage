import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class ProfileModule { }
