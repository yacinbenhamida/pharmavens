import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Pack } from '../models/pack.model';
import { Produit } from '../models/produit.model';
import { ProductService } from '../services/product.service';
import { PackService } from '../services/pack.service';
import { PackProduit } from '../models/packproduit.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
declare var $ : any;

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit {
  options: DataTables.Settings = {};
  trigger: Subject<Pack> = new Subject();
  showForm: boolean = false
  addError: boolean = false
  packToadd: Pack = {} as Pack
  packForm: FormGroup;
  produits: Produit[] = []
  listPacks: Pack[] = []
  selectedPack: Pack
  PPOfselectedPack: PackProduit[] = []
  selectedPackForDelete: Pack
  user: User = {} as User
  initialLoder: boolean
  constructor(private fb: FormBuilder, private produitserv: ProductService, private packserv: PackService,
    private userv: UserService) {
    this.packForm = this.fb.group({
      products: this.fb.array([]),
    });

  }

  ngOnInit() {
    this.packToadd.prix_total = 0
    this.selectedPackForDelete = {} as Pack
    this.initialLoder = true
    this.options = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
    this.userv.getCurrentUser().subscribe((u: User) => {
      this.produitserv.getAll().subscribe((resl: Produit[]) => {
        this.user = u
        this.produits = resl
        if(u.role === 'admin'){
          this.packserv.getAll().subscribe((packs: Pack[]) => {
            this.listPacks = packs
            this.initialLoder = false
            this.trigger.next()
          })
        }else{
          this.packserv.getVisiblePacks().subscribe((packs: Pack[]) => {
            this.listPacks = packs
            this.initialLoder = false
            this.trigger.next()
          })
        }    
      })
    })

  }
  showPanel() {
    this.showForm = true
  }
  hidePanel() {
    this.showForm = false
  }
  submit(g: NgForm) {
    if (g.valid && this.packForm.valid && this.packToadd) {
      this.packserv.add(this.packToadd, this.packForm.value.products).toPromise().then((res) => {
        window.location.reload()
      }).catch(err => { this.addError = true })

    }
    else this.addError = true
  }
  products(): FormArray {
    return this.packForm.get("products") as FormArray
  }

  newProduct(): FormGroup {
    return this.fb.group({
      produit: new FormControl({}, Validators.required),
      quantite: new FormControl({}, Validators.required),
      gratuit: new FormControl(false, Validators.required),
      prixUnitaire: new FormControl({ value: '0', disabled: true }, Validators.required)
    })
  }
  addProduct() {
    this.products().push(this.newProduct());
  }

  removeProduct(i: number) {
    this.products().removeAt(i);
    if (this.packForm.value.products[i]) this.packForm.value.products.splice(i, 1)
    this.calculPrixTotal()
  }
  loadPrice(prod, qte, i) {
    if (prod && qte && i >= 0) {
      let id = Number(prod.substring(prod.indexOf(':') + 1, prod.length))
      let produit: Produit = this.produits.filter(x => x.id === id)[0]
      this.products().at(i).value.prixUnitaire = produit.prix
      this.calculPrixTotal()
      return Number(produit.prix * qte)
    }
    else return 0
  }
  calculPrixTotal() {
    this.packToadd.prix_total = 0
    for (const element of this.packForm.value.products) {
      if (element.prixUnitaire == undefined && element.gratuit == false) {
        element.prixUnitaire = this.produits.filter(x => x.id === element.produit)[0].prix
      }
      if (element.prixUnitaire >= 0 && element.quantite >= 0) {
        this.packToadd.prix_total += Number(element.prixUnitaire) * Number(element.quantite)
      }
    }
  }

  setProductValue(i, prod, event) {
    if (event.target.checked == true) {
      this.products().at(i).value.prixUnitaire = 0
      this.products().at(i).value.gratuit = true
    }
    else if (event.target.checked == false) {
      let id = Number(prod.substring(prod.indexOf(':') + 1, prod.length))
      let produit: Produit = this.produits.filter(x => x.id === id)[0]
      this.products().at(i).value.prixUnitaire = produit.prix
      this.products().at(i).value.gratuit = false
    }
    this.calculPrixTotal()
  }
  showPackDetails(pack: Pack) {
    this.packserv.getProdPacks(pack.id).subscribe((res: PackProduit[]) => {
      this.selectedPack = pack
      this.PPOfselectedPack = res
    })

  }
  deletePack() {
    $('#sizedModalSm').modal('hide');
    this.packserv.delete(this.selectedPackForDelete.id).subscribe(() => {
      this.selectedPackForDelete = null
      window.location.reload()
    })
  }
  setPack(p) {
    if(p){
      this.selectedPackForDelete = p
      $('#sizedModalSm').modal('show');
    }
  }
  calculPourcentage() {
    if (this.packToadd.pourcentage_unite_gratuites_grossiste >= 0 && this.packToadd.prix_total >= 0) {
      this.packToadd.valeur_unite_gratuites_grossiste_ttc = ((this.packToadd.prix_total * (this.packToadd.pourcentage_unite_gratuites_grossiste / 100)))
    } else {
      this.packToadd.pourcentage_unite_gratuites_grossiste = 0
      alert('pourcentage > 0')
    }
  }
  calculPourcentageVD() {
    if (this.packToadd.pourcentage_unite_gratuites_vd >= 0 && this.packToadd.prix_total >= 0) {
      this.packToadd.valeur_unite_gratuites_vd_ttc = ((this.packToadd.prix_total * (this.packToadd.pourcentage_unite_gratuites_vd / 100)))
    } else {
      this.packToadd.pourcentage_unite_gratuites_vd = 0
      alert('pourcentage > 0')
    }
  }
  togglePackVisiblity(p){  
    this.packserv.updatePackVisiblity(p.id).subscribe((res)=>{
      p.visible = !p.visible
    })
  }
}
