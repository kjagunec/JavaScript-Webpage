import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {AuthService} from "../../login/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  users : User[] = []

  constructor(private userService:UserService, private authService:AuthService, private fb:FormBuilder) {
    this.userService.getUsers().subscribe(res => this.users = res);
  }

  getLoginForm() : FormGroup {
    return this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password' : new FormControl('', Validators.required)
    });
  }

  getUserForm() : FormGroup {
    return this.fb.group({
      'email' : new FormControl('', [Validators.email, Validators.required]),
      'password1' : new FormControl('', Validators.required),
      'password2' : new FormControl('', Validators.required),
      'username' : new FormControl('', Validators.required)
    });
  }

  checkIfValid(form:FormGroup, name:string) : string {

    if (form.controls[name].status == 'VALID') {
      return 'is-valid';
    }
    else if (form.controls[name].status == 'INVALID' && !form.controls[name].pristine) {
      return 'is-invalid';
    }
    else {
      return '';
    }

  }

  formCheck(form : FormGroup, addUser : Boolean) : string {

    if (form.value['password1'] != form.value['password2']) {

      return 'Lozinke nisu iste!';

    } else {

      if (this.users.find((u : User) => form.value['email'] === u.email)) {

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

    let user : User | null = this.authService.getUser();
    if (user) {

      user.email = form.value['email'];
      user.password = form.value['password1'];
      user.username = form.value['username'];

      this.userService.editUser(user);

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
