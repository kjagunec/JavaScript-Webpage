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
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    this.userService.getUsers().subscribe(res => this.users = res);

    let post : Post = new Post();

    post.id = 1;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/21_I15.png";
    post.title = "Title ipsum";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt interdum aliquam. Maecenas id felis eu sapien auctor consectetur nec. ";
    this.posts.push(post);

    post = new Post();
    post.id = 2;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/23_I11.png";
    post.title = "Title2";
    post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tincidunt erat, mollis suscipit urna. Nam mollis metus a ullamcorper faucibus. Duis feugiat erat justo, nec elementum tortor porttitor facilisis. ";
    this.posts.push(post);

    post = new Post();
    post.id = 3;
    post.picture = "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/34_i04.png";
    post.title = "Title3";
    post.text = "text3";
    this.posts.push(post);

    this.navService.checkCurrentRoute();

    this.authService.userChange.subscribe(res => {

      this.user = res;
      /*if (this.user) {

        if (this.user.admin) this.postService.getPosts().subscribe(posts => this.posts = posts);
        else this.postService.getPosts().subscribe(posts => this.posts = posts.filter(p => {
          if(this.user) p.idUsers = this.user.id
        }));

      }*/


    });

    this.postService.addPostErrorEmitter.subscribe(res => {
      this.newPostMessage = res.message;
      this.newPostMessageClass = res.alert;
    });

    this.categoryService.addCategoryErrorEmitter.subscribe(res => {
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

  saveEditPost() {
    this.posts.forEach(p => {
      if (p.id == this.editingPost.id) p = this.editingPost;
    })
  }

  addNewPost() {
    if (this.user) this.newPost.idUsers = this.user.id;
    this.postService.addPost(this.newPost);
  }

  addNewProduct() {
    console.log(this.newProduct.idCategories);
    //this.productService.addProduct(this.newProduct);
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
    this.newProductMessage = '';
    this.newProductMessageClass = '';
  }

  refreshNewCategory() {
    this.newCategory = new Category();
    this.newCategoryMessage = '';
    this.newCategoryMessageClass = '';
  }
}
