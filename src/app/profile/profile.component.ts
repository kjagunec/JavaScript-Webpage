import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {User} from "../shared/models/user.model";
import {NavbarService} from "../shared/services/navbar.service";
import {Post} from "../shared/models/post.model";
import {PostService} from "../shared/services/post.service";
import {Router} from "@angular/router";
import {Product} from "../shared/models/product.model";
import {Category} from "../shared/models/category.model";
import {ProductService} from "../shared/services/product.service";
import {CategoryService} from "../shared/services/category.service";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : User | null = new User();
  posts : Post[] = [];
  products : Product[] = [];
  categories : Category[] = [];
  users : User[] = [];

  editingPost : Post = new Post();
  editingProduct : Product = new Product();
  editingCategory : Category = new Category();
  editingUser : User = new User();

  newPost : Post = new Post();
  newProduct : Product = new Product();
  newCategory : Category = new Category();

  showNewPost : boolean = false;
  showNewProduct : boolean = false;
  showNewCategory : boolean = false;

  newPostMessage : string = '';
  newProductMessage : string = '';
  newCategoryMessage : string = '';

  newPostMessageClass : string = '';
  newProductMessageClass : string = '';
  newCategoryMessageClass : string = '';

  constructor(
    private authService : AuthService,
    private navService : NavbarService,
    private postService : PostService,
    private productService : ProductService,
    private categoryService : CategoryService,
    private userService : UserService) {}

  ngOnInit() {

    this.productService.getProducts().subscribe(res => this.products = res);
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
      if (this.categories[0]) this.newProduct.idCategories = this.categories[0].id;
    });
    this.userService.getUsers().subscribe(res => this.users = res);

    this.navService.checkCurrentRoute();

    this.authService.userChange.subscribe(res => {

      this.user = res;
      if (this.user) {

        if (this.user.admin) this.postService.getPosts().subscribe(posts => this.posts = posts);
        else this.postService.getPosts().subscribe(posts => this.posts = posts.filter(p => {
          if (this.user) return p.idUsers == this.user.id
          else return false
        }));

      }


    });

    this.postService.addPostEmitter.subscribe(res => {
      this.newPostMessage = res.message;
      this.newPostMessageClass = res.alert;
    });

    this.productService.addProductEmmiter.subscribe(res => {
      this.newProductMessage = res.message;
      this.newProductMessageClass = res.alert;
    })

    this.categoryService.addCategoryEmitter.subscribe(res => {
      this.newCategoryMessage = res.message;
      this.newCategoryMessageClass = res.alert;
    });

  }

  isAdmin() : boolean {
    return this.authService.isAdmin();
  }

  editPost(post : Post) {
    this.editingPost = {...post};
  }

  editProduct(product : Product) {
    this.editingProduct = {...product};
  }

  editCategory(category : Category) {
    this.editingCategory = {...category};
  }

  editUser(user : User) {
    this.editingUser = {...user};
  }

  saveEditPost() {
    this.postService.editPost(this.editingPost);
  }

  saveEditProduct() {
    this.productService.editProduct(this.editingProduct);
  }

  removePost(postId : number) {
    this.postService.deletePost(postId);
  }

  removeProduct(productId : number) {
    this.productService.deleteProduct(productId);
  }

  addNewPost() {
    if (this.user) this.newPost.idUsers = this.user.id;
    this.postService.addPost(this.newPost);
  }

  addNewProduct() {
    this.productService.addProduct(this.newProduct);
  }

  addNewCategory() {
    this.categoryService.addCategory(this.newCategory);
  }

  refreshNewPost() {
    this.newPost = new Post();
    this.newPostMessage = '';
    this.newPostMessageClass = '';
  }

  refreshNewProduct() {
    this.newProduct = new Product();
    this.newProduct.idCategories = this.categories[0].id;
    this.newProductMessage = '';
    this.newProductMessageClass = '';
  }

  refreshNewCategory() {
    this.newCategory = new Category();
    this.newCategoryMessage = '';
    this.newCategoryMessageClass = '';
  }

  getUsernameById(id : number) {
    let user = this.userService.getUser(id);
    if (user) return user.username;
    else return "Nevažeći id";
  }
}
