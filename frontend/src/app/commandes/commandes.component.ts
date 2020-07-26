import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Produit } from '../models/produit.model';
import { Commande } from '../models/commande.model';
import { CommandeService } from '../services/commande.service';
import { Pack } from '../models/pack.model';
import { PackService } from '../services/pack.service';
import { PackProduit } from '../models/packproduit.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  clients: Client[]
  targetClient: any
  commandeForm: FormGroup;
  produits: Produit[] 
  totalTTC: number 
  totalReduction: number 
  totalQte: number 
  estimations: boolean
  selectedPack: Pack
  packs: Pack[] = []
  isPanache : boolean
  commandeToAdd: Commande = {} as Commande
  prixpanacheActuel:number = 0
  today:Date = new Date()
  targetGrossiste : any
  grossistes : Client []
  constructor(private cliserv: ClientService,
    private fb: FormBuilder, private prodserv: ProductService,
    private comserv: CommandeService, private packserv: PackService,
    private userservice: UserService) {
    
  }
  ngOnInit() {
    this.getTodayDate()
    this.grossistes = []
    this.targetClient = 0
    this.targetGrossiste = 0
    this.totalQte = 0
    this.estimations = false
    this.selectedPack = null
    this.totalReduction = 0
    this.totalQte = 0
    this.totalTTC = 0
    this.produits = []
    this.packs= []
    this.clients = []
    this.commandeToAdd = {} as Commande
    this.commandeForm = this.fb.group({
      products: this.fb.array([]),
    });
    if (this.userservice.getLoggedOn()) {
      this.userservice.getCurrentUser().subscribe((user: any) => {
        this.cliserv.getAll('pharmacie').subscribe((ph: Client[]) => {
          this.cliserv.getAll('grossiste').subscribe((g: Client[]) => {
            this.prodserv.getAll().subscribe((p:Produit[])=>{
              this.produits = p
              this.grossistes = g
               this.packserv.getAll().subscribe((packs: Pack[]) => {
              this.packs = packs
              if (user) {
                if (user.role == 'admin') {
                  this.clients = ph.concat(g)                 
                }
                else {
                  let pharmacie, grossistes = null
                  pharmacie = ph.filter(x => x.delegue.email === this.userservice.getLoggedOn().email)
                  if (pharmacie) {
                    this.clients = this.clients.concat(pharmacie)
                  }
                  grossistes = g.filter(x => x.delegue.email === this.userservice.getLoggedOn().email)
                  if (grossistes) {
                    this.clients = this.clients.concat(grossistes)
                  }
                }
              }
            })
            })
           
          })
        })
      })
    }
  }
  products(): FormArray {
    return this.commandeForm.get("products") as FormArray
  }
  getTodayDate(){
    setInterval(()=>{
      this.today = new Date()
    },1000)
  }
  newProduct(): FormGroup {
    return this.fb.group({
      produit: new FormControl({}, Validators.required),
      quantite: new FormControl(0, Validators.required),
      reduction: new FormControl(0, Validators.required),
      prixTTC: new FormControl({ value: 0, disabled: true }, Validators.required)
    })
  }

  addProduct() {
    if(this.isPanache && this.selectedPack){
      if(this.selectedPack.prix_total > this.commandeToAdd.prix_total){
        alert('vous avez dépassé la limite du pack')
        return;
      }else this.products().push(this.newProduct());
    }else this.products().push(this.newProduct());
  }

  addProductWithValue(prod, qte, red, prix) {
    this.products().push(this.fb.group({
      produit: new FormControl(prod.id, Validators.required),
      quantite: new FormControl(qte, Validators.required),
      reduction: new FormControl(red, Validators.required),
      prixTTC: new FormControl({ value: prix, disabled: true }, Validators.required)
    }));
  }
  removeProduct(i: number) {
    this.products().removeAt(i);
    this.estimationTotal()
  }
  reset(){
    this.ngOnInit()
  }
  submit() {
    if (this.products() && this.commandeForm.valid) {
      this.commandeToAdd.prix_total = this.totalTTC
      this.commandeToAdd.total_remise = this.totalReduction
      this.commandeToAdd.nb_produits = this.totalQte
      this.commandeToAdd.client = this.targetClient
      if (this.selectedPack) this.commandeToAdd.selectedPackId = this.selectedPack.id
      this.comserv.add(this.commandeToAdd, this.products().value).subscribe((res) => {
        if (this.selectedPack) {
          this.packserv.updatePackSoldCount(this.selectedPack.id).subscribe((res) => {
            window.location.reload()
          })
        } else window.location.reload()
      })
    }

  }
  calculRed(i,pttc) {
    let line = this.products().at(i).value
    let prod = line.produit
    if(prod && line && line.reduction>=0 && line.quantite >=0){
        let id = prod
        let produit: Produit = this.produits.filter(x => x.id === id)[0]
        const nprix = Number((produit.prix) - (produit.prix * (line.reduction / 100)))
        this.products().at(i).value.prixTTC = nprix * line.quantite
        pttc.value = nprix * line.quantite
        this.estimationTotal()     
    }  
  }
  estimationTotal() {
    this.totalQte = 0
    this.totalReduction = 0
    this.totalTTC = 0
    if(this.isPanache && this.selectedPack.type_pack === 'panache'){
      let cumulp = 0
      this.commandeForm.value.products.forEach(element => {
        this.totalQte += element.quantite ? Number(element.quantite) : 0
        let produitu: Produit = this.produits.filter(x => x.id === element.produit)[0]
        const nprixu = Number(produitu.prix - (produitu.prix * (element.reduction / 100)))
        cumulp += Number(nprixu * element.quantite)
      });
      this.prixpanacheActuel = cumulp
      if(cumulp > this.selectedPack.prix_total){
        alert('vous avez dépassé la limite du montant prescrit par le pack choisit.')
        this.selectedPack = null
        this.isPanache = false
        this.estimationTotal()
      }else{
        this.estimations = true
        this.totalQte = 0
        this.totalReduction = 0
        this.totalTTC = this.selectedPack.prix_total
      }
    }else {
      this.isPanache = false
      this.estimations = true
      this.totalQte = 0
      this.totalReduction = 0
      this.totalTTC = 0
      let nbprod = 0
      this.commandeForm.value.products.forEach(element => {
        this.totalQte += element.quantite ? Number(element.quantite) : 0
        this.totalReduction += element.reduction ? Number(element.reduction) : 0
        nbprod++
        let produitu: Produit = this.produits.filter(x => x.id === element.produit)[0]
        const nprixu = Number(produitu.prix - (produitu.prix * (element.reduction / 100)))
        this.totalTTC += Number(nprixu * element.quantite)
        
      });
      if(this.commandeToAdd.remise_total_grossite >=0 && this.targetClient.type_client === 'grossiste'){
        this.totalTTC = this.totalTTC - (this.totalTTC * (this.commandeToAdd.remise_total_grossite / 100))
      } 
      this.totalReduction = (Number(this.totalReduction) / nbprod)
    }

  }
  loadPackage() {
    if (this.targetClient.type_client == 'pharmacie') {
      this.packserv.getProdPacks(this.selectedPack.id).subscribe((data: PackProduit[]) => {
        if (data && this.selectedPack.type_pack == "normal") {
          this.isPanache = false
          this.products().controls = []
          data.forEach(p => {
            this.addProductWithValue(p.produits_packs[0], p.quantite, 0, Number(p.produits_packs[0].prix * p.quantite))
          })
        }else if (this.selectedPack.type_pack === 'panache'){
          this.isPanache = true
          this.products().controls = []
          this.commandeForm.value.products = []
        }  
        this.estimationTotal()    
        //this.totalTTC = this.selectedPack.prix_total
      })
    }
  }
  verifyPack() {
    if (this.targetClient.type_client == 'grossiste') {
      this.products().controls = []
      this.isPanache = false
      this.estimations = false
      this.totalQte = 0
      this.totalReduction = 0
      this.totalTTC = 0
      this.commandeToAdd.remise_total_grossite = 0
    }
  }
}
