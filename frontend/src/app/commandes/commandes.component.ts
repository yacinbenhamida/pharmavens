import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CommandeProduit } from '../models/commandeproduit.model';
import { CommandeProduitItemComponent } from '../commande-produit-item/commande-produit-item.component';
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

  clients: Client[] = []
  targetClient: any
  commandeForm: FormGroup;
  produits: Produit[] = []
  totalTTC: number = 0
  totalReduction: number = 0
  totalQte: number = 0
  estimations: boolean = false
  selectedPack: Pack
  packs: Pack[] = []
  commandeToAdd: Commande = {} as Commande
  constructor(private cliserv: ClientService,
    private fb: FormBuilder, private prodserv: ProductService,
    private comserv: CommandeService, private packserv: PackService,
    private userservice: UserService) {
    
  }
  ngOnInit() {
    this.targetClient = 0
    this.totalQte = 0
    this.estimations = false
    this.selectedPack = null
    this.packs= []
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

  newProduct(): FormGroup {
    return this.fb.group({
      produit: new FormControl({}, Validators.required),
      quantite: new FormControl({}, Validators.required),
      reduction: new FormControl({ value: '0' }, Validators.required),
      prixTTC: new FormControl({ value: '0', disabled: true }, Validators.required)
    })
  }

  addProduct() {
    this.products().push(this.newProduct());
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
      this.comserv.add(this.commandeToAdd, this.products().value).subscribe(() => {
        if (this.selectedPack) {
          this.packserv.updatePackSoldCount(this.selectedPack.id).subscribe(() => {
            window.location.reload()
          })
        } else window.location.reload()
      })
    }

  }
  calculRed(selectedp, qte, red) {
    let id = Number(selectedp.substring(selectedp.indexOf(':') + 1, selectedp.length))
    let produit: Produit = this.produits.filter(x => x.id === id)[0]
    const nprix = Number((produit.prix) - (produit.prix * (red / 100)))
    this.estimationTotal()
    return Number(nprix * qte)
  }
  estimationTotal() {
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
    this.totalReduction = (Number(this.totalReduction) / nbprod)
  }
  loadPackage() {
    if (this.targetClient.type_client == 'pharmacie') {
      this.packserv.getProdPacks(this.selectedPack.id).subscribe((data: PackProduit[]) => {
        if (data) {
          this.products().controls = []
          data.forEach(p => {
            this.addProductWithValue(p.produits_packs[0], p.quantite, 0, Number(p.produits_packs[0].prix * p.quantite))
          })
        }
        this.estimationTotal()
        this.totalTTC = this.selectedPack.prix_total
      })
    }
  }
  verifyPack() {
    if (this.targetClient.type_client == 'grossiste' && this.products().controls.length > 0) {
      this.products().controls = []
      this.estimations = false
      this.totalQte = 0
      this.totalReduction = 0
      this.totalTTC = 0
    }
  }
}
