import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user.model";
import {NavbarService} from "../shared/services/navbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;
  loginErrorMessage : string = '';
  loginEmailMessage : string = '';

  registerForm! : FormGroup;
  registerErrorMessage : string = '';
  registerSuccessMessage : string = '';
  registerEmailMessage : string = '';

  users : User[] = [];

  constructor(private fb:FormBuilder, private authService:AuthService, private userService:UserService, private navbar:NavbarService) {}

  ngOnInit() {

    this.navbar.checkCurrentRoute();

    this.loginForm = this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password' : new FormControl('', Validators.required)
    });

    this.registerForm = this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password1' : new FormControl('', Validators.required),
      'password2' : new FormControl('', Validators.required),
      'username' : new FormControl('', Validators.required)
    });

    this.authService.errorEmitter.subscribe((message : string) => {
      this.loginErrorMessage = message;
    });

    this.userService.errorEmmiter.subscribe((message : string) => {
      this.registerErrorMessage = message;
    });

    this.userService.newUserAddedEmmiter.subscribe((message : string) => {
      this.registerSuccessMessage = message;
    });

    this.loginForm.valueChanges.subscribe(res => {
      if (res.email == '') this.loginEmailMessage = 'Obavezno polje!';
      else if (this.loginForm.controls['email'].status == 'INVALID') this.loginEmailMessage = 'Neispravna adresa!';
      else this.loginEmailMessage = '';
    });

    this.registerForm.valueChanges.subscribe(res => {
      if (res.email == '') this.registerEmailMessage = 'Obavezno polje!';
      else if (this.loginForm.controls['email'].status == 'INVALID') this.registerEmailMessage = 'Neispravna adresa!';
      else this.registerEmailMessage = '';
    });

  }

  onLoginSubmit() {

    let credentials : {email:string, password:string} = {
      email : this.loginForm.value['email'],
      password : this.loginForm.value['password']
    };

    this.authService.login(credentials);

    console.log('login submit');

  }

  onRegisterSubmit() {

    if (this.registerForm.value['password1'] != this.registerForm.value['password2']) {

      this.registerErrorMessage = 'Lozinke nisu iste!';

    } else {

      this.userService.getUsers().subscribe((users : User[]) => {

        this.users = users;

      });

      if (this.users.find((u : User) => this.registerForm.value['email'] === u.email)) {

        this.registerErrorMessage = 'Već postoji korisnički račun s tom e-mail adresom!';

      } else {

        let user : User = new User();
        user.email = this.registerForm.value['email'];
        user.password = this.registerForm.value['password1'];
        user.username = this.registerForm.value['username'];

        this.userService.addUser(user);

      }

    }

  }

  checkIfValid(form:FormGroup, name:string) : string {

    if (form.controls[name].status == 'VALID') return 'is-valid';
    else if (form.controls[name].status == 'INVALID' && !form.controls[name].pristine) return 'is-invalid';
    else return '';

  }
}
