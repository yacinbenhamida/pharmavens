import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Contact } from '../models/contact.model';
import { Rapport } from '../models/rapport.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  baseUrl : string = environment.backend.baseUrl;

  constructor(private http:HttpClient, private userService : UserService) { }
  getRdOfRapport(rapport){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(rapport &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getRDOfrapport',{report : rapport},options)
    }       
    return null
  }
  add(rapport:Rapport,rapport_data){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(rapport && rapport_data &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addRapport',{rapport : rapport, rapport_data : rapport_data , email:connnectedUser.email},options)
    }       
    return null
  }
  update(rapport:Rapport,rapport_data,deletableRows){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(rapport && rapport_data && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/editRapport',{rapport : rapport, rapport_data : rapport_data , 
        deletable : deletableRows,email:connnectedUser.email},options)
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
      return this.http.get(this.baseUrl+'/getAllRapports',options)
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
      return this.http.post(this.baseUrl+'/deleteRapport',{id : id},options)
    }
    return null
  }
}
