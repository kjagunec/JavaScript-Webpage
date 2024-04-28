import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "../models/user.model";
import {DataService} from "./data.service";
import {AuthService} from "../../login/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users : User[] = [];
  private userSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  errorEmmiter : Subject<string> = new Subject<string>();
  newUserAddedEmmiter : Subject<string> = new Subject<string>();
  userEditedEmmiter : Subject<string> = new Subject<string>();

  constructor(private dataService : DataService, private authService : AuthService) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.dataService.getUsers().subscribe((res : {status:string, rows:User[]}) => {
      if (res.status == 'OK') {
        this.users = res.rows;
        this.userSubject.next([...this.users]);
      } else {
        console.log(res.status);
        this.errorEmmiter.next(res.status);
      }
    })
  }

  getUsers() : BehaviorSubject<User[]> {
    return this.userSubject;
  }

  addUser(user : User) {
    this.dataService.addUser(user).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.newUserAddedEmmiter.next('Uspješna registracija!')
        this.refreshUsers();
      }
      else {
        console.log(res.status);
        this.errorEmmiter.next(res.status);
      }
    })
  }

  getUser(userId : number) : User | undefined {
    return this.users.find((u : User) => u.id == userId);
  }

  deleteUser(userId : number) {
    this.dataService.deleteUser(userId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') this.refreshUsers();
      else {
        console.log(res.status);
        this.errorEmmiter.next(res.status);
      }
    })
  }

  editUsers(users : User[]) {
    users.forEach(u => {
      this.dataService.editUser(u).subscribe(res => {
        if (res.status == 'OK') {
          this.refreshUsers();
        }
        else {
          console.log(res.status);
        }
      })
    })
  }

  editCurrentUser(user : User) {
    this.dataService.editUser(user).subscribe(res => {
      if (res.status == 'OK') {
        this.userEditedEmmiter.next('Promjene spremljene!');
        this.refreshUsers();
        this.authService.logout();
      }
      else console.log(res.status);
    })
  }

}
