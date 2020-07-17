import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Pack } from '../models/pack.model';
import { Veille } from '../models/veille.model';

@Injectable({
  providedIn: 'root'
})
export class VeilleService {

  constructor(private http:HttpClient, private userService : UserService) { }

  add(veille:Veille){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(veille && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/addVeille',{veille : veille, user : connnectedUser.email},options)
    }       
    return null
  }
  getVeillesOfProduct(idp){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(idp && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/getVeillesOfProduct',{id : idp},options)
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
      return this.http.post('/api/editProduct',{produit : product},options)
    }
    return null
  }
  getProdPacks(id:number){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/getProdPacks',{pack : id},options)
    }
    return null
  }
  updatePackSoldCount(id:number){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post('/api/incrementPackSold',{pack : id},options)
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
      return this.http.get('/api/getVeilles',options)
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
      return this.http.post('/api/deleteVeille',{id : id},options)
    }
    return null
  }
}
