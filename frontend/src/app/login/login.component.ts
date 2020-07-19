import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router"  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string = null
  password : string  = null
  always : boolean = true
  errors : boolean = false
  constructor(private userservice:UserService,private router: Router) { }

  ngOnInit() {
    if(this.userservice.isAuthenticated()){
      this.router.navigate(['/dashboard'])
    }
  }
  login(){
    if(this.email && this.password){
      try{
        this.userservice.login(this.email,this.password).subscribe((res:any)=>{
        if(res && res.auth){
          let user :any = {
            token : res.token,
            email : this.email,
            role : res.role
          }
          if(this.always){     
            localStorage.setItem('connected',JSON.stringify(user))
          }
          else sessionStorage.setItem('connected',JSON.stringify(user))
          
          this.router.navigate(['/dashboard'])
          
        }else this.errors = true
      },(err)=>{
        this.errors = true
      })}catch(e){
        this.errors = true
      }
    }
  }
  check(){
    this.always = !this.always
  }
}
