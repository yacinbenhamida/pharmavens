import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productToAdd : Produit = {} as Produit
  addError : boolean = false
  showForm : boolean = false
  products : Produit [] = []
  modification : boolean = false
  ajout : boolean = true
  selectedProduct : Produit
  p:number = 1
  constructor(private prodServ : ProductService) { }

  loadProducts(){

  }
  ngOnInit() {
    this.prodServ.getAll().subscribe((res : Produit[])=>{
      if(res) this.products = res
    },err=>{
      this.products = []
    })
  }
  submit(f:NgForm){
    if(f.valid && this.productToAdd){
      this.prodServ.addProduct(this.productToAdd).subscribe((res)=>{
        if(res) window.location.reload()
      },error=>{
        this.addError = true
      } )
    }
  }
  submitModif(f:NgForm){
    if(f.valid && this.productToAdd){
      this.prodServ.editProduct(this.productToAdd).subscribe((res)=>{
        if(res) window.location.reload()
      },error=>{
        this.addError = true
      } )
    }
  }
  filterProducts(content){
    if(content){
      this.products = this.products.filter(x=>x.libelle.toLowerCase().indexOf(content.toLowerCase()) != -1 ||x.libelle.toLowerCase().includes(content.toLowerCase()))
    }
    else this.ngOnInit()
  }
  handleProductOp($event){
    let resval = $event
    if (resval.op == 'edit' && resval.product){
      this.productToAdd = resval.product
      this.modification = true
      this.ajout = false
      this.showForm = true
    }else if(resval.op == 'del' && resval.product){
      // delete
      this.selectedProduct = resval.product
    }
  }
  deleteProduct(){
    if(this.selectedProduct){
      this.prodServ.delete(this.selectedProduct.id).subscribe((res)=>window.location.reload(),err=>window.location.reload())
    }
  }
  showPanel(){
    this.modification = false
    this.ajout = true
    this.showForm = true
    if(this.productToAdd) this.productToAdd = {} as Produit
  }
  hidePanel(){
    this.modification = false
    this.ajout = true
    this.showForm = false
  }
}
