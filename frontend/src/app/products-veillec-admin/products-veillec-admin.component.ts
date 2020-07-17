import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Veille } from '../models/veille.model';
import { VeilleService } from '../services/veille.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-products-veillec-admin',
  templateUrl: './products-veillec-admin.component.html',
  styleUrls: ['./products-veillec-admin.component.css']
})
export class ProductsVeillecAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  trigger: Subject<Veille> = new Subject();
  veilles : Veille [] = []
  selectedVeille : Veille
  selectedReview : Veille // delete
  user:User = {} as User
  resTable  = {}
  constructor(private veilleserv:VeilleService,private userservice:UserService) { }
  group(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    if(this.userservice.getLoggedOn()){
      this.userservice.getCurrentUser().subscribe((user:any)=>{
      this.veilleserv.getAll().subscribe((res:Veille[])=>{
        this.user = user
        if(user.role === 'admin') this.veilles = res
        else {
          this.veilles = res.filter(x=>x.analyseur.email === user.email)
        }
      this.trigger.next()
    })
      console.log(this.group(this.veilles,(v)=>v.produitCible.libelle))
      })
    }
  }
  showDetails(v){
    this.selectedVeille = v
  }
  deleteReview(){
    this.veilleserv.delete(this.selectedReview.id).subscribe(()=>window.location.reload())
  }
}
