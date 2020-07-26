import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-client-grossistes',
  templateUrl: './client-grossistes.component.html',
  styleUrls: ['./client-grossistes.component.css']
})
export class ClientGrossistesComponent implements OnInit {
  grossisteToAdd : Client = {} as Client
  showForm : boolean = false
  ajout : boolean = false
  modification : boolean =false
  listgr : Client [] = []
  addError : boolean = false
  selectedGrossiste : Client = {} as Client
  // dt
  dtOptions: DataTables.Settings = {};
  trigger: Subject<Client> = new Subject();
  deleges : User[] = []
  constructor(private cliService : ClientService, private userv:UserService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.cliService.getAll('grossiste').subscribe((res : Client[])=>{
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
    if(this.grossisteToAdd) this.grossisteToAdd = {} as Client
  }
  hidePanel(){
    this.modification = false
    this.ajout = true
    this.showForm = false
  }
  submit(form){
    if(form.valid && this.grossisteToAdd){
      this.grossisteToAdd.type_client ="grossiste"
      this.cliService.add(this.grossisteToAdd).subscribe(res=>{
        if(res) {
          window.location.reload()
        }
      },err => this.addError = true)
    } 
  }
  editGrossiste(grossite:Client){
    this.grossisteToAdd = grossite
    if(grossite.delegue) this.grossisteToAdd.delegue = grossite.delegue
    this.ajout = false
    this.modification = true
    this.showForm = true
  }
  submitModif(form){
    if(form.valid && this.grossisteToAdd){
      this.cliService.edit(this.grossisteToAdd).subscribe(res=>{
        if(res) {
          window.location.reload()
        }
      },err => this.addError = true)
    } 
  }
  deleteSeller(){
    if(this.selectedGrossiste){
      this.cliService.delete(this.selectedGrossiste.id).subscribe((res)=>{
        window.location.reload()
      },err=>window.location.reload())
    } 
  }
}
