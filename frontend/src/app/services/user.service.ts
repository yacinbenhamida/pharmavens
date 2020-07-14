import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { Vehicule } from '../models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getLoggedOn(){
    return localStorage.getItem('connected') ? JSON.parse(localStorage.getItem('connected')) : JSON.parse(sessionStorage.getItem('connected'))
  }
  login(email,password){
    return this.http.post('/api/login',{email : email,password : password})
  }
  logout(){
    let user :any = this.getLoggedOn()
    if(user){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+user.token });
      let options = { headers: headers };
      return this.http.post('/api/logout',{email : user.email},options)
    }
    return null
  }
  getCurrentUser(){
    let user :any = this.getLoggedOn()
    if(user){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+user.token });
      let options = { headers: headers };
      return this.http.get('/api/connected?email='+user.email,options)
    }
    return null
  }
  getAllDeleges(){
    let user :any = this.getLoggedOn()
    if(user){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+user.token });
      let options = { headers: headers };
      return this.http.get('/api/allDeleges',options)
    }
    return null
  }
  getAllUsers(){
    let user :any = this.getLoggedOn()
    if(user){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+user.token });
      let options = { headers: headers };
      return this.http.get('/api/allUsers',options)
    }
    return null
  }
  addUser(user:User, vehicule : Vehicule){
    let connnectedUser :any = this.getLoggedOn()
    if(user && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/register',{user : user , vehicule : vehicule},options)
    }
    return null
  }
  public isAuthenticated(): boolean {
    const user = localStorage.getItem('connected') ? JSON.parse(localStorage.getItem('connected')) : JSON.parse(sessionStorage.getItem('connected'))
    return user && user.token 
  }
  deleteUser(id:number){
    let connnectedUser :any = this.getLoggedOn()
    if(id && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/deleteUser',{id : id},options)
    }
    return null
  }
  updateUser(user:User){
    let connnectedUser :any = this.getLoggedOn()
    if(user && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/updateUser',{user : user },options)
    }
    return null
  }
  updateUserPW(pw:string){
    let connnectedUser :any = this.getLoggedOn()
    if(pw && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/update-pw',{password : pw, email : connnectedUser.email },options)
    }
    return null
  }
}
