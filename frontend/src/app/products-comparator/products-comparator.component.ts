import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProductService } from '../services/product.service';
import { VeilleService } from '../services/veille.service';
import { Veille } from '../models/veille.model';

@Component({
  selector: 'app-products-comparator',
  templateUrl: './products-comparator.component.html',
  styleUrls: ['./products-comparator.component.css']
})
export class ProductsComparatorComponent implements OnInit {
  items : Produit[] = []
  origItems : Produit[] = [];
  myProduct : Produit
  targetMedic : string
  veilles : Veille[] = []
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  constructor(private prodserv:ProductService, private veillecserv:VeilleService) { }

  ngOnInit() {
    this.prodserv.getAll().subscribe((res:Produit[])=>{
      this.items = res
      this.origItems = res
    })
  }
  onChangeofOptions(opt){
    if(this.myProduct){
      this.veillecserv.getVeillesOfProduct(this.myProduct.id).subscribe((res:Veille[])=>{
        this.veilles = res
      })
    }
  }
  filterItem(event) {
    if (!event) {
      this.items = this.origItems;
    }
    if (typeof event === 'string') {
      this.items = this.origItems.filter(a => a.libelle.toLowerCase()
        .startsWith(event.toLowerCase()));
    }
    this.selectList.nativeElement.size = this.items.length + 1;
  } 
}
