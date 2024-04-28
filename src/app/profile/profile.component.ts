import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {User} from "../shared/models/user.model";
import {NavbarService} from "../shared/services/navbar.service";
import {Post} from "../shared/models/post.model";
import {PostService} from "../shared/services/post.service";
import {Product} from "../shared/models/product.model";
import {Category} from "../shared/models/category.model";
import {ProductService} from "../shared/services/product.service";
import {CategoryService} from "../shared/services/category.service";
import {UserService} from "../shared/services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FormService} from "../shared/services/form.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : User = new User();
  posts : Post[] = [];
  products : Product[] = [];
  categories : Category[] = [];
  users : User[] = [];

  editingPost : Post = new Post();
  editingProduct : Product = new Product();
  editingCategory : Category = new Category();
  editingUsers : User[] = [];

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

  showSaveChangesForAdmin : boolean = false;

  editUserForm! : FormGroup;
  formControlEmail! : FormControl;
  formControlUsername! : FormControl;
  editUserReadonly : boolean = true;

  editUserMessageSuccess : string = '';
  editUserMessageError : string = '';
  editUserEmailMessage: string = '';



  constructor(
    private authService :     AuthService,
    private navService :      NavbarService,
    private postService :     PostService,
    private productService :  ProductService,
    private categoryService : CategoryService,
    private userService :     UserService,
    private formService :     FormService) {}

  ngOnInit() {

    this.editUserForm = this.formService.getEditForm();
    this.formControlEmail = this.editUserForm.controls['email'] as FormControl;
    this.formControlUsername = this.editUserForm.controls['username'] as FormControl;

    this.productService.getProducts().subscribe(res => this.products = res);
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
      if (this.categories[0]) this.newProduct.idCategories = this.categories[0].id;
    });
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.editingUsers = [];
      this.users.forEach(u => {
        u.password = "";
        this.editingUsers.push({...u})
      });
    });

    this.navService.checkCurrentRoute();

    this.authService.userChange.subscribe(res => {

      this.user = res;
      if (this.user.id != 0) {

        if (this.user.admin) {
          this.postService.getPosts().subscribe(posts => this.posts = posts);
        }
        else {
          this.postService.getPosts().subscribe(posts => this.posts = posts.filter(p =>
            p.idUsers == this.user.id));
        }

        this.formControlEmail.setValue(this.user.email);
        this.formControlUsername.setValue(this.user.username);

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

    this.editUserForm.valueChanges.subscribe(res => {
      this.editUserEmailMessage = this.formService.getEmailMessage(this.editUserForm, res);
    });

    this.userService.userEditedEmmiter.subscribe(res => {
      this.editUserMessageSuccess = res;
      this.editUserMessageError = '';
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

  saveEditPost() {
    this.postService.editPost(this.editingPost);
  }

  saveEditProduct() {
    this.productService.editProduct(this.editingProduct);
  }

  saveEditCategory() {
    this.categoryService.editCategory(this.editingCategory);
    this.resetCategory();
  }

  saveEditUsers() {
    this.userService.editUsers([...this.editingUsers]);
    this.resetEditUsers();
  }

  resetCategory() {
    this.editingCategory = new Category();
  }

  resetEditUsers() {
    this.editingUsers = [];
    this.users.forEach(u => this.editingUsers.push({...u}));
    this.showSaveChangesForAdmin = false;
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

  getUsernameById(id : number) : string {
    let user = this.userService.getUser(id);
    if (user) return user.username;
    else return "Nevažeći id";
  }

  onEditUserSubmit() {

    this.editUserMessageError = this.formService.formCheck(this.editUserForm, false);
    if (this.editUserMessageError != '') {
      this.editUserMessageSuccess = '';
    }

  }

  checkIfValid(form:FormGroup, name:string) : string {
    return this.formService.checkIfValid(form, name, this.editUserReadonly);
  }

  cancelUserEdit() {
    this.editUserReadonly = true;
    this.formControlEmail.setValue(this.user.email);
    this.formControlUsername.setValue(this.user.username);
    this.editUserMessageSuccess = "";
    this.editUserMessageError = "";
  }

}
