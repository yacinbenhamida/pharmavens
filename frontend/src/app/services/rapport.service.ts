import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Contact } from '../models/contact.model';
import { Rapport } from '../models/rapport.model';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private http:HttpClient, private userService : UserService) { }
  getRdOfRapport(rapport){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(rapport &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/getRDOfrapport',{report : rapport},options)
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
      return this.http.post('/api/addRapport',{rapport : rapport, rapport_data : rapport_data , email:connnectedUser.email},options)
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
      return this.http.post('/api/editRapport',{rapport : rapport, rapport_data : rapport_data , 
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
      return this.http.get('/api/getAllRapports',options)
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
      return this.http.post('/api/deleteRapport',{id : id},options)
    }
    return null
  }
}
