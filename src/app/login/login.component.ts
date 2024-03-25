import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

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
  registerEmailMessage : string = '';

  constructor(private fb:FormBuilder, private authService:AuthService) {}

  ngOnInit() {

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

    this.authService.errorEmitter.subscribe((res : string) => {
      this.loginErrorMessage = res;
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


    }

  }

  checkIfValid(form:FormGroup, name:string) : string {

    if (form.controls[name].status == 'VALID') return 'is-valid';
    else if (form.controls[name].status == 'INVALID' && !form.controls[name].pristine) return 'is-invalid';
    else return '';

  }
}
