import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AboutComponent} from "./about/about.component";
import {ProductsComponent} from "./products/products.component";
import {NewsComponent} from "./news/news.component";
import {CategoryComponent} from "./category/category.component";

export const routes: Routes = [
  {path: '',             component: MainComponent},
  {path: 'about',        component: AboutComponent},
  {path: 'products',     component: ProductsComponent},
  {path: 'products/:id', component: CategoryComponent},
  {path: 'news',         component: NewsComponent}
];
