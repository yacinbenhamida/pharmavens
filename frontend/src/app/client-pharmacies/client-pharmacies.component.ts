import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { Subject } from 'rxjs';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-client-pharmacies',
  templateUrl: './client-pharmacies.component.html',
  styleUrls: ['./client-pharmacies.component.css']
})
export class ClientPharmaciesComponent implements OnInit {

  pharmacieToAdd : Client = {} as Client
  showForm : boolean = false
  ajout : boolean = false
  modification : boolean =false
  addError:boolean = false
  listgr : Client [] = []
  error : boolean = false
  selectedpharmacie : Client = {} as Client
  // dt
  dtOptions: DataTables.Settings = {};
  trigger: Subject<Client> = new Subject();
  deleges : User [] = []
  constructor(private cliService : ClientService,private userv:UserService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.cliService.getAll('pharmacie').subscribe((res : Client[])=>{
      if(res){
        this.listgr = res
        this.trigger.next()
      } 
    },err=>this.listgr = [])
    this.userv.getAllDeleges().subscribe((res:User[])=>{
      this.deleges = res
    })
  }
  showPanel(){
    this.modification = false
    this.ajout = true
    this.showForm = true
    if(this.pharmacieToAdd) this.pharmacieToAdd = {} as Client
  }
  hidePanel(){
    this.modification = false
    this.ajout = true
    this.showForm = false
  }
  submit(form){
    if(form.valid && this.pharmacieToAdd){
      this.pharmacieToAdd.type_client ="pharmacie"
      this.cliService.add(this.pharmacieToAdd).subscribe(res=>{
        if(res) {
          window.location.reload()
        }
      },err => this.addError = true)
    } 
  }
  editpharmacie(ph:Client){
    this.pharmacieToAdd = ph
    if(ph.delegue) this.pharmacieToAdd.delegue = ph.delegue
    this.ajout = false
    this.modification = true
    this.showForm = true
  }
  submitModif(form){
    if(form.valid && this.pharmacieToAdd){
      this.cliService.edit(this.pharmacieToAdd).subscribe(res=>{
        if(res) {
          window.location.reload()
        }
      },err => this.error = true)
    } 
  }
  deleteSeller(){
    if(this.selectedpharmacie){
      this.cliService.delete(this.selectedpharmacie.id).subscribe((res)=>{
        window.location.reload()
      },err=>window.location.reload())
    } 
  }
}
