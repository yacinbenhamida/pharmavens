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
export class StatService {

  constructor(private http:HttpClient, private userService : UserService) { }

  getAll(){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.get('/api/getStats',options)
    }
    return null
  }
}
