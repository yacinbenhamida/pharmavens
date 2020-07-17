import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  error : boolean = false
  deletionError : boolean = false

  public data:User [] = [];
  userToAdd : User = {} as User // form submission
  carToAdd : Vehicule = {} as Vehicule
  selectedUser : User = {} as User // for deletion
  editableUser : User // for edition
  connectedUser : User = {} as User
  constructor(private userservice:UserService) {
    userservice.getCurrentUser().subscribe((x:User)=>{
      this.connectedUser = x
    })
   }

  dtOptions: DataTables.Settings = {};
  usersTrigger: Subject<User> = new Subject();
  ngOnInit() {
    this.userToAdd.type_contrat = 'type'
    this.userToAdd.role='Role'
    this.userToAdd.sexe = 'homme'
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.userservice.getAllUsers().subscribe((data:User[])=>{
      this.data = data
      this.usersTrigger.next()
    },err=>{
      this.error = true
    })
    
}
  submit(f:NgForm){
    if(f.valid && this.userToAdd){
      this.userservice.addUser(this.userToAdd,this.carToAdd).subscribe(res=>{
        window.location.reload()
      },err=>{
        this.error = true
      })
    }
    else this.error = true
  }
  online(str){
    return str == 'active' ? 'badge badge-success text-center' : 'badge badge-danger text-center'
  }
  roleClass(role){
    return role == 'admin' ? 'badge badge-danger' : 'badge badge-warning'
  }
  etatCompte(input){
    return input == false ? 'badge badge-danger text-center' : 'badge badge-success text-center'
  }
 checkGender(s){
   this.userToAdd.sexe = s
 }
 deleteUser(){
   if(this.selectedUser){
    this.userservice.deleteUser(this.selectedUser.id).subscribe(res=>{
      window.location.reload()
    },err=>{
      this.deletionError = true
    })
   }
 }
 setEditableUser(user:User){
   this.editableUser = null 
  this.editableUser = user
 }
}
