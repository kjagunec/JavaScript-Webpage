import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private dataService : DataService) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.dataService.getUsers().subscribe((res : {status:string, rows:User[]}) => {
      if (res.status == 'OK') {
        this.users = res.rows;
        this.userSubject.next([...this.users]);
      }
    })
  }

  getUsers() : BehaviorSubject<User[]> {
    return this.userSubject;
  }

  addUser(user : User) {
    this.dataService.addUser(user).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshUsers();
      }
    })
  }

  getUser(userId : number) : User | undefined {
    return this.users.find((u : User) => u.id == userId);
  }

  deleteUser(userId : number) {
    this.dataService.deleteUser(userId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') {
        this.refreshUsers();
      }
    })
  }
}
