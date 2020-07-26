import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { Vehicule } from '../models/vehicule.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : string = environment.backend.baseUrl;
  constructor(private http:HttpClient) { }

  getLoggedOn(){
    return localStorage.getItem('connected') ? JSON.parse(localStorage.getItem('connected')) : JSON.parse(sessionStorage.getItem('connected'))
  }
  login(email,password){
    return this.http.post(this.baseUrl+'/login',{email : email,password : password})
  }
  logout(){
    let user :any = this.getLoggedOn()
    if(user){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+user.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/logout',{email : user.email},options)
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
      return this.http.get(this.baseUrl+'/connected?email='+user.email,options)
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
      return this.http.get(this.baseUrl+'/allDeleges',options)
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
      return this.http.get(this.baseUrl+'/allUsers',options)
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
      return this.http.post(this.baseUrl+'/register',{user : user , vehicule : vehicule},options)
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
      return this.http.post(this.baseUrl+'/deleteUser',{id : id},options)
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
      return this.http.post(this.baseUrl+'/updateUser',{user : user },options)
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
      return this.http.post(this.baseUrl+'/update-pw',{password : pw, email : connnectedUser.email },options)
    }
    return null
  }
}
