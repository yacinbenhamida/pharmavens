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
  oldMdp : string
  newMdp : string
  confirmMdp : string
  updatePwError : boolean
  updateInfoPError : boolean
  updateInfoError : boolean
  constructor(private userv:UserService) {
   }

  ngOnInit() {
    this.updatePwError = false
    this.updateInfoPError = false
    this.updateInfoError = false
    this.userv.getCurrentUser().subscribe((r:User)=>{
      this.user = r})
  }
  updateInfoPublique(){
    this.userv.updateUser(this.user).subscribe((res:Response)=>{
      if(res.status == 200) window.location.reload()
      else this.updateInfoError = true
    })
  }
  updatePw(){
    if(this.oldMdp && this.newMdp && this.confirmMdp){
      if(this.newMdp === this.confirmMdp){
        this.userv.updateUserPW(this.confirmMdp).subscribe((res:Response)=>{
          if(res.status === 200) window.location.reload()
          else this.updatePwError = true
        })
      }
      else this.updatePwError = true
    }else this.updatePwError = true
  }
}
