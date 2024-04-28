import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {AuthService} from "../../login/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  users : User[] = []
  user : User = new User();

  constructor(private userService:UserService, private authService:AuthService, private fb:FormBuilder) {

    this.userService.getUsers().subscribe(res => this.users = res);
    this.authService.userChange.subscribe(res => this.user = res);

  }

  getLoginForm() : FormGroup {
    return this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password' : new FormControl('', Validators.required)
    });
  }

  getRegisterForm() : FormGroup {
    return this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password1' : new FormControl('', Validators.required),
      'password2' : new FormControl('', Validators.required),
      'username' : new FormControl('', Validators.required)
    });
  }

  getEditForm() : FormGroup {
    return this.fb.group({
      'email' : new FormControl(this.user.email, [Validators.email, Validators.required]),
      'password1' : new FormControl(''),
      'password2' : new FormControl(''),
      'username' : new FormControl(this.user.username, Validators.required)
    });
  }

  checkIfValid(form:FormGroup, name:string, readonly:boolean) : string {

    let bootstrapClass : string = "form-control";

    if (readonly) {
      return bootstrapClass + "-plaintext";
    }

    if (form.controls[name].status == 'VALID') {
      return bootstrapClass + " is-valid";
    }
    else if (form.controls[name].status == 'INVALID' && !form.controls[name].pristine) {
      return bootstrapClass + " is-invalid";
    }
    else {
      return bootstrapClass;
    }

  }

  formCheck(form : FormGroup, addUser : Boolean) : string {

    if (form.value['password1'] != form.value['password2']) {

      return 'Lozinke nisu iste!';

    } else {

      if (this.users.find((u : User) => form.value['email'] === u.email && u.id != this.user.id)) {

        return 'Već postoji korisnički račun s tom e-mail adresom!';

      } else {

        if (addUser) {

          this.addUserFromForm(form);
          return '';

        } else {

          this.editUserFromForm(form);
          return '';

        }

      }

    }

  }

  private addUserFromForm(form : FormGroup) {

    let user : User = new User();
    user.email = form.value['email'];
    user.password = form.value['password1'];
    user.username = form.value['username'];

    this.userService.addUser(user);

  }

  private editUserFromForm(form : FormGroup) {

    let user : User = {...this.user};
    if (user.id != 0) {

      user.email = form.value['email'];
      user.password = form.value['password1'];
      user.username = form.value['username'];

      this.userService.editCurrentUser(user);

    } else {

      console.log("Korisnik nije prijavljen");

    }

  }

  getEmailMessage(form: FormGroup, res: any) : string {
    if (res.email == '') {
      return 'Obavezno polje!';
    }
    else if (form.controls['email'].status == 'INVALID') {
      return 'Neispravna adresa!';
    }
    else return '';
  }
}
