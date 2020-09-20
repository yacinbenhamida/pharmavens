import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

import { Evaluation } from '../models/evaluation.model';
import { environment } from 'src/environments/environment.prod';
import { Prospet } from '../models/prospet.model';

@Injectable({
  providedIn: 'root'
})
export class ProspetService {
  baseUrl : string = environment.backend.baseUrl;

  constructor(private http:HttpClient, private userService : UserService) { }
  getProspetOfUser(id){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getAllProspetsOfUser',{id : id},options)
    }
    return null
  }
  add(prospet:Prospet,userid){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(prospet &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addProspet',{prospet : prospet , userid: userid},options)
    }       
    return null
  }
  updateProspet(prospet){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(prospet && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/updateProspet',{prospet : prospet},options)
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
      return this.http.get(this.baseUrl+'/getAllProspets',options)
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
      return this.http.post(this.baseUrl+'/deleteProspet',{id : id},options)
    }
    return null
  }
}
