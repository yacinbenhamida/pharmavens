import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient, private userService : UserService) { }
  get(email){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/getNotificationsOfUser',{email : email},options)
    }
    return null
  }
  add(content:string, title:string , targetsId :number[], sender, taskId){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(content && title && targetsId && sender && taskId &&   connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/addNotif',{notif : {content : content , title : title}
       , targets : targetsId , sender : sender , taskId : taskId},options)
    }       
    return null
  }
  updateSeen(email){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(email && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/updateNotif',{email : email},options)
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
      return this.http.post('/api/getAllTasks',{email : connnectedUser.email},options)
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
      return this.http.post('/api/deleteNotif',{id : id},options)
    }
    return null
  }
}
