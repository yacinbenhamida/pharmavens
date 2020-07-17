import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../models/commande.model';
import { Subject } from 'rxjs';
import { CommandeProduit } from '../models/commandeproduit.model';
import { Produit } from '../models/produit.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-commandes-historique',
  templateUrl: './commandes-historique.component.html',
  styleUrls: ['./commandes-historique.component.css']
})
export class CommandesHistoriqueComponent implements OnInit {
  commandes :Commande [] = []
  constructor(private comserv:CommandeService, private userv:UserService) { }
  dtOptions: DataTables.Settings = {};
  trigger: Subject<Commande> = new Subject();
  detailsCommande : CommandeProduit [] = []
  selectedCommande : Commande
  isPrinting : boolean = false
  deletableInvoice : Commande
  user:User = {} as User
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,  
      processing: true,
      responsive : true
    };
    this.userv.getCurrentUser().subscribe((user:any)=>{
      if(user){
        this.user = user
        this.comserv.getAll().subscribe((res : Commande[])=>{
          if(user.role === "admin"){
            this.commandes = res
          }
          else{
            this.commandes = res.filter(x=>x.emetteur.email === user.email)
          }  
            this.trigger.next()
        })
      }
      
    })
    
  }
  loadInvoice(c:Commande){
    this.selectedCommande = c
    console.log(this.selectedCommande)
    this.comserv.getProduitsOfCommande(c.id).subscribe((lignec:CommandeProduit[])=>{
        this.detailsCommande = lignec
    })
  }
  deleteInvoice(){
    if(this.deletableInvoice){
      this.comserv.delete(this.deletableInvoice.id).subscribe((r)=>{
        window.location.reload()
      })
    }
    
  }
  printPage(){
    this.isPrinting = true
    document.getElementById('x').style.display = "none"
    document.getElementById('imp').style.display = "none"
    let printContents = document.getElementById('print').innerHTML;
     let originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
     window.location.reload()
  }
}
