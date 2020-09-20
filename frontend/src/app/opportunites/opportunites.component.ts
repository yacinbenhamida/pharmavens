import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Prospet } from '../models/prospet.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ProspetService } from '../services/prospet.service';

@Component({
  selector: 'app-opportunites',
  templateUrl: './opportunites.component.html',
  styleUrls: ['./opportunites.component.css']
})
export class OpportunitesComponent implements OnInit {

  options: DataTables.Settings = {};
  trigger: Subject<Prospet> = new Subject();
  prospets:Prospet [] =[]
  prospetToAdd:Prospet 
  prospetToDelete : Prospet
  ajout:boolean = false
  modification : boolean = false
  addError : boolean = false
  loading:boolean = true
  user : User
  constructor(private prospserv:ProspetService, private userv:UserService) { }

  ngOnInit() {
    this.prospetToAdd= {} as Prospet
    this.user = {} as User
    this.prospetToAdd.type_prospet = null
    this.prospetToAdd.potentiel = null
    this.options = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.userv.getCurrentUser().subscribe((user:User)=>{
      this.user = user
      if(user.role == "admin" || user.role == "superviseur"){
        this.prospserv.getAll().subscribe((c:Prospet[])=>{
          this.prospets = c
          this.trigger.next()       
      })
      }else{
        this.prospserv.getProspetOfUser(user.id).subscribe((c:Prospet[])=>{
          this.prospets = c
          this.trigger.next()       
      })
      }
      
    })
      
    
  }
  add(f:NgForm){
    if(f.valid && this.prospetToAdd){
        this.prospserv.add(this.prospetToAdd,this.user.id).subscribe((r)=>{
          window.location.reload()
    },err=>this.addError = true)
    }  
  }
  update(f:NgForm){
    if(f.valid && this.prospetToAdd){
        this.prospserv.updateProspet(this.prospetToAdd).subscribe((r)=>{
        window.location.reload()
    })
    }  
  }
  setContactForEdit(c:Prospet){
    this.prospetToAdd = c
    this.modification = true
    if(this.ajout) this.ajout = false
  }
  setOpp(c:Prospet){
    this.prospetToDelete = c
  }
  deleteOpp(){
    if(this.prospetToDelete){
        this.prospserv.delete(this.prospetToDelete.id).subscribe((res)=>{
        window.location.reload()
    })
    }  
  }
  cancelEditionOrAdd(){
    this.ajout = false
    this.modification = false
    this.prospetToAdd = {} as Prospet
  }
  addNewOpp(){
    this.ajout = true
    if(this.modification){
      this.prospetToAdd = {} as Prospet
      this.modification = false
    }
  }
  accordAdmin(c,bool){
    c.accord_direction = bool
    if(bool == true){
      if(confirm('êtes vous sûr(e) de confirmer cette opprotunité ?')){
        this.prospserv.updateProspet(c).subscribe((r)=>{
      })
      }
    }else{
      if(confirm("êtes vous sûr(e) de supprimer cette opportunité?")){
        this.prospserv.delete(c.id).subscribe((r)=>{
          window.location.reload()
      })
      }
    }
  }
  accordSup(c,bool){
    c.accord_superviseur = bool
    if(bool == true){
      if(confirm('êtes vous sûr(e) de vouloir confirmer cette opprotunité ?')){
        this.prospserv.updateProspet(c).subscribe((r)=>{
      })
      }
    }else{
      if(confirm("êtes vous sûr(e) de vouloir refuser cette opportunité?")){
        this.prospserv.updateProspet(c.id).subscribe((r)=>{
      })
      }
    }
  }
}
