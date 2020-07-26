import { Component, OnInit, Input } from '@angular/core';
import { Rapport } from '../models/rapport.model';
import { RapportService } from '../services/rapport.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rapport-form',
  templateUrl: './rapport-form.component.html',
  styleUrls: ['./rapport-form.component.css']
})
export class RapportFormComponent implements OnInit {
  @Input() inputData : any
  rapportToAdd : Rapport
  delegues:User[]
  ajout:boolean
  modif : boolean
  reviewForm: FormGroup;
  deletableRows : any [] = []
  addError : boolean = false
  constructor(private fb:FormBuilder,private rapserv:RapportService, private userv:UserService) {
    this.reviewForm = this.fb.group({
      row: this.fb.array([]) ,
    });
   }

  ngOnInit() {
    this.delegues = []
    if(this.inputData && this.inputData.op === 'modif' && this.inputData.rapport_delege){
      this.ajout = false
      this.modif = true
      this.inputData.rapport_delege.forEach(elem=>{
        this.report().push(this.newPopulatedRow(elem))
      })
    }else{
        this.ajout = true
        this.modif = false
    }
    if(this.inputData && this.inputData.report){
      this.rapportToAdd = this.inputData.report
    }  
    if(!this.rapportToAdd){
      this.rapportToAdd = {} as Rapport
      this.rapportToAdd.type_rapport = null
      this.rapportToAdd.jour_ferie = false
      this.rapportToAdd.reunion = false
    } 
    this.userv.getAllDeleges().subscribe((user:User[])=>{
      this.delegues = user
    })
    
  }
  report() : FormArray {
    return this.reviewForm.get("row") as FormArray
  }
   
  newRow(): FormGroup {
    return this.fb.group({
      idDelegue : new FormControl({},Validators.required),
      manifestation: new FormControl("aucune",Validators.required),
      conges : new FormControl(false, Validators.required),
      nb_jours_conges : new FormControl(0,Validators.required),
      realise_obj_1 : new FormControl(0,Validators.required),
      realise_obj_2 : new FormControl(0,Validators.required),
      total_realise : new FormControl(0,Validators.required),
      pharma_gro_realisees : new FormControl(null,Validators.required),
      realise_ventes : new FormControl(0,Validators.required),
      rapport_envoye : new FormControl(false,Validators.required),
      respect_plan_tournee : new FormControl(false,Validators.required),
      visite_detail : new FormControl(false,Validators.required),
      promesse_packs : new FormControl(false,Validators.required),
      respect_plan_charge : new FormControl(false,Validators.required),
      remarques_pertinentes : new FormControl(false,Validators.required),
      veille_c : new FormControl(false,Validators.required),
      capture_ecran : new FormControl(false,Validators.required),
      pourcentage_satisfaction : new FormControl(null,Validators.required),
    })
  } 
  newPopulatedRow(data) : FormGroup {
    return this.fb.group({
      id : new FormControl(data.id,Validators.required),
      idDelegue : new FormControl(data.idDelegue,Validators.required),
      manifestation: new FormControl(data.manifestation,Validators.required),
      conges : new FormControl(data.conges, Validators.required),
      nb_jours_conges : new FormControl(data.nb_jours_conges,Validators.required),
      realise_obj_1 : new FormControl(data.realise_obj_1,Validators.required),
      realise_obj_2 : new FormControl(data.realise_obj_2,Validators.required),
      total_realise : new FormControl(data.total_realise,Validators.required),
      pharma_gro_realisees : new FormControl(data.pharma_gro_realisees,Validators.required),
      realise_ventes : new FormControl(data.realise_ventes,Validators.required),
      rapport_envoye : new FormControl(data.rapport_envoye,Validators.required),
      respect_plan_tournee : new FormControl(data.respect_plan_tournee,Validators.required),
      visite_detail : new FormControl(data.visite_detail,Validators.required),
      promesse_packs : new FormControl(data.promesse_packs,Validators.required),
      respect_plan_charge : new FormControl(data.respect_plan_charge,Validators.required),
      remarques_pertinentes : new FormControl(data.remarques_pertinentes,Validators.required),
      veille_c : new FormControl(data.veille_c,Validators.required),
      capture_ecran : new FormControl(data.capture_ecran,Validators.required),
      pourcentage_satisfaction : new FormControl(data.pourcentage_satisfaction,Validators.required),
    })
  }
  addRow() {
    this.report().push(this.newRow());
  }
   
  removeRow(i:number) {
    if(this.modif){
      this.deletableRows.push(this.report().at(i).value)
    }
    this.report().removeAt(i);
  }
  addReport(g:NgForm){
    if(g.valid && this.report().value.length > 0 && this.rapportToAdd){
      this.report().value.forEach(element => {
      element.total_realise = element.realise_obj_1 + element.realise_obj_2
    });
    this.rapserv.add(this.rapportToAdd,this.report().value).subscribe((res)=>{
      window.location.reload()
    },err=>this.addError = true)
    }
    
  }
  editReport(g:NgForm){
    if(g.valid && this.report().value.length > 0 && this.rapportToAdd){
      this.report().value.forEach(element => {
        element.total_realise = element.realise_obj_1 + element.realise_obj_2
      });
    this.rapserv.update(this.rapportToAdd,this.report().value,this.deletableRows).subscribe(d=>{
      window.location.reload()
    })
  }
  }
  calculTotalObj(){
    if(this.rapportToAdd.objectif_1 >=0 && this.rapportToAdd.objectif_2 >=0) this.rapportToAdd.objectif_total = this.rapportToAdd.objectif_1 + this.rapportToAdd.objectif_2
  }
}
