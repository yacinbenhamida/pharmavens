import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Client } from '../models/client.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl : string = environment.backend.baseUrl;

  constructor(private http:HttpClient, private userService : UserService) { }

  add(client:Client){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(client && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addClient',{client : client},options)
    }
    return null
  }
  edit(client:Client){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(client && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/editClient',{client : client},options)
    }
    return null
  }
  getAll(type){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.get(this.baseUrl+'/allClients?type='+type,options)
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
      return this.http.post(this.baseUrl+'/deleteClient',{id : id},options)
    }
    return null
  }
}
