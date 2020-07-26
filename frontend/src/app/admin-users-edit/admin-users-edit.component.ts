import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { Vehicule } from '../models/vehicule.model';
import { UserService } from '../services/user.service';
import { VehiculeService } from '../services/vehicule.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.css']
})
export class AdminUsersEditComponent implements OnInit {
  @Input() targetUser : User 
  cartToEdit : Vehicule 
  showSection : boolean = false
  error : boolean  = false
  isVisible : boolean = false
  constructor(private userservice:UserService, private vehicleService : VehiculeService) { }

  ngOnInit() {
    if(this.targetUser){        
      this.isVisible = true
      this.vehicleService.getUserVehicle(this.targetUser.email).subscribe((res:Vehicule)=>{
        if (res) this.cartToEdit = res
        else this.cartToEdit = {} as Vehicule 
        setTimeout(()=>this.showSection = true , 2500)
      },err => {
        this.cartToEdit = {} as Vehicule 
      })
    }
  }
  checkGender(s){
    this.targetUser.sexe = s
  }
  updateUser(f:NgForm) {
    if(this.targetUser && f.valid){
      this.targetUser.vehicule = this.cartToEdit
      this.userservice.updateUser(this.targetUser).subscribe((res)=>{
        if(res) window.location.reload()
      },err=>{
        this.error = true
      })
    }
  }
  dismiss(){
    setTimeout(
    this.targetUser = null , 2000)
  }
}
