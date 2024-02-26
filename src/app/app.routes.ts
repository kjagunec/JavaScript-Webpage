import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AboutComponent} from "./about/about.component";
import {ProductsComponent} from "./products/products.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products', component: ProductsComponent}
];
