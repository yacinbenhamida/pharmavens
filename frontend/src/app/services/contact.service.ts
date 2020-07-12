import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Reunion } from '../models/reunion.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient, private userService : UserService) { }
  add(reun:Contact){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(reun &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/addContact',{contact : reun , email:connnectedUser.email},options)
    }       
    return null
  }
  update(contact){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(contact && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/updateContact',{contact : contact},options)
    }       
    return null
  }
  getAll(){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.get('/api/getAllContacts',options)
    }
    return null
  }
  delete(id){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(id && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/deleteContact',{id : id},options)
    }
    return null
  }
}
