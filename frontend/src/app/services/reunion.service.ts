import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Reunion } from '../models/reunion.model';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor(private http:HttpClient, private userService : UserService) { }
  add(reun:Reunion){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(reun &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/addReun',{reunions : reun , email:connnectedUser.email},options)
    }       
    return null
  }
  update(reunion){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(reunion && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/updateReun',{reun : reunion},options)
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
      return this.http.post('/api/getAllReun',{email : connnectedUser.email},options)
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
      return this.http.post('/api/deleteReun',{id : id},options)
    }
    return null
  }
}
