import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Produit } from '../models/produit.model';
import { Client } from '../models/client.model';
import { Commande } from '../models/commande.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  baseUrl : string = environment.backend.baseUrl;

  constructor(private http:HttpClient, private userService : UserService) { }

  add(commande:Commande, produits:Produit[]){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(commande && produits && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/addCommande',{commande : commande , produits : produits , emetteur : connnectedUser.email},options)
    }
    return null
  }
  getProduitsOfCommande(id:number){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(id  && connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.post(this.baseUrl+'/getCommandesProducts',{commande : id },options)
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
  getAll(){
    let connnectedUser :any = this.userService.getLoggedOn()
    if(connnectedUser){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "JWT "+connnectedUser.token });
      let options = { headers: headers };
      return this.http.get(this.baseUrl+'/getAllCommandes',options)
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
      return this.http.post(this.baseUrl+'/deleteCommande',{commandeId : id},options)
    }
    return null
  }
}
