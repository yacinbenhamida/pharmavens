import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User = {} as User
  constructor(private userv:UserService) { }

  ngOnInit() {
    this.userv.getCurrentUser().subscribe((r:User)=>this.user = r)
  }

}
