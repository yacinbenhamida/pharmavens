import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  options: DataTables.Settings = {};
  trigger: Subject<Contact> = new Subject();
  contacts:Contact [] =[]
  contactToAdd:Contact = {} as Contact
  contactForDetails : Contact
  contactToDelete : Contact
  ajout:boolean = false
  modification : boolean = false
  addError : boolean = false
  loading:boolean = true
  constructor(private contserv:ContactService) { }

  ngOnInit() {
    this.options = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    setTimeout(()=>{
      this.contserv.getAll().subscribe((c:Contact[])=>{
        this.contacts = c
        if(c.length > 0){
          this.contactForDetails = c [0]
          this.loading = false
        }
        if(c.length == 0){
          this.ajout = true
        }
        this.trigger.next()       
    })
    },3000)
    
  }
  addContact(f:NgForm){
    if(f.valid && this.contactToAdd){
        this.contserv.add(this.contactToAdd).subscribe((r)=>{
          window.location.reload()
    },err=>this.addError = true)
    }  
  }
  updateContact(f:NgForm){
    if(f.valid && this.contactToAdd){
        this.contserv.update(this.contactToAdd).subscribe((r)=>{
        window.location.reload()
    })
    }  
  }
  showDetails(c:Contact){
    this.loading = true
    setTimeout(()=>{
      this.contactForDetails = c
      this.loading = false
    },2000)
    
  }
  setContactForEdit(c:Contact){
    this.contactToAdd = c
    this.modification = true
    if(this.ajout) this.ajout = false
  }
  setContact(c:Contact){
    this.contactToDelete = c
  }
  deleteContact(){
    if(this.contactToDelete){
        this.contserv.delete(this.contactToDelete.id).subscribe((res)=>{
        window.location.reload()
    })
    }  
  }
  cancelEditionOrAdd(){
    this.ajout = false
    this.modification = false
    this.contactToAdd = {} as Contact
  }
  addNewContact(){
    this.ajout = true
    if(this.modification){
      this.contactToAdd = {} as Contact
      this.modification = false
    }
  }
}
