import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl : string = environment.backend.baseUrl;

  constructor(private http:HttpClient, private userService : UserService) { }
  get(id){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getTask',{task : id},options)
    }
    return null
  }
  add(task:Task , users :User[]){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(task && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addTask',{task : task , users : users},options)
    }       
    return null
  }
  edit(product:Produit){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(product && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/editProduct',{produit : product},options)
    }
    return null
  }
  getUTOFtask(id:number){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getUTOfTask',{task : id},options)
    }
    return null
  }
  getTasksOfUser(id:number){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getTasksOfUser',{user : id},options)
    }
    return null
  }
  updateTaskStatus(id:number,status:boolean){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/updateTaskstatus',{id : id , state : status},options)
    }
    return null
  }
  setTaskToPrivate(id:number,status:boolean){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/setTaskToprivate',{id : id , state : status},options)
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
      return this.http.get(this.baseUrl+'/getAllTasks',options)
    }
    return null
  }
  getAllPlannings(iduser) : Observable<any> {
    let connnectedUser :any = this.userService.getLoggedOn()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "JWT "+connnectedUser.token });
    let options = { headers: headers };
    return this.http.get(this.baseUrl+'/getPlannings/'+iduser,options)
  }
  getAllPlanningsOfUser(iduser) : Observable<any> {
    let connnectedUser :any = this.userService.getLoggedOn()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "JWT "+connnectedUser.token });
    let options = { headers: headers };
    return this.http.get(this.baseUrl+'/getPlanningsOfUser/'+iduser,options)
  }
  delete(id){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(id && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/deleteTask',{id : id},options)
    }
    return null
  }
  addPlanning(planning, userid){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(userid && planning && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addPlanning',{planning : planning , user : userid},options)
    }       
    return null
  }
  editPlanning(planning, userid){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(userid && planning && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/updatePlanning',{planning : planning , user : userid},options)
    }       
    return null
  }
  deletePlanning(id){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(id && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/deletePlanning',{id : id},options)
    }
    return null
  }
  getDisponibilitesForSimpleUser(){
    let connnectedUser :any = this.userService.getLoggedOn()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "JWT "+connnectedUser.token });
    let options = { headers: headers };
    return this.http.get(this.baseUrl+'/getUserPlanning',options)
  }
  getDisponibilitesForAdmin(){
    let connnectedUser :any = this.userService.getLoggedOn()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "JWT "+connnectedUser.token });
    let options = { headers: headers };
    return this.http.get(this.baseUrl+'/getAdminPlanning',options)
  }
}
