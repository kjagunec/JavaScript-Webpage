import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth/auth.service";
import {User} from "../shared/models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : User | null = this.authService.getUser();

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.authService.authChange.subscribe(() => this.user = this.authService.getUser())
  }

  isAdmin() : boolean {
    return !!this.authService.isAdmin();
  }

}
