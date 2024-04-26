import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user.model";
import {NavbarService} from "../shared/services/navbar.service";
import {FormService} from "../shared/services/form.service";

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

  constructor(private authService : AuthService,
              private userService : UserService,
              private navbar : NavbarService,
              private formService : FormService) {}

  ngOnInit() {

    this.navbar.checkCurrentRoute();

    this.loginForm = this.formService.getLoginForm();

    this.registerForm = this.formService.getUserForm();

    this.authService.errorEmitter.subscribe((message : string) => {
      this.loginErrorMessage = message;
    });

    this.userService.errorEmmiter.subscribe((message : string) => {
      this.registerErrorMessage = message;
    });

    this.userService.newUserAddedEmmiter.subscribe((message : string) => {
      this.registerErrorMessage = '';
      this.registerSuccessMessage = message;
    });

    this.loginForm.valueChanges.subscribe(res => {
      this.loginEmailMessage = this.formService.getEmailMessage(this.loginForm, res);
    });

    this.registerForm.valueChanges.subscribe(res => {
      this.registerEmailMessage = this.formService.getEmailMessage(this.registerForm, res);
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

    this.registerErrorMessage = this.formService.formCheck(this.registerForm, true);

  }

  checkIfValid(form:FormGroup, name:string) : string {

    return this.formService.checkIfValid(form, name);

  }
}
