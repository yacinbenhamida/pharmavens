import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';
declare var $ : any;

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
    this.userToAdd.role=null
    this.userToAdd.sexe = 'homme'
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
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
    return str == 'active' ? 'badge badge-success text-center ml-2' : 'badge badge-danger text-center ml-2'
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
    $('#sizedModalSm').modal('hide');
    this.userservice.deleteUser(this.selectedUser.id).subscribe(()=>{
      window.location.reload()
    },err=>{
      window.location.reload()
    })
      
   }
 }
 setEditableUser(user:User){
    this.editableUser = null 
    this.editableUser = user
 }

 updateVehiculeInfo(){
    this.carToAdd.date_derniere_vidange = null
    this.carToAdd.carte_grise = null;
    this.carToAdd.date_echeance_assurance = null;
    this.carToAdd.date_vignette = null
    this.carToAdd.immatriculation = null
    this.carToAdd.kilometrage = null
    this.carToAdd.modele = null
 }
}
