import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evaluation } from '../models/evaluation.model';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { EvalService } from '../services/eval.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {
  ajout : boolean
  modification : boolean
  addError:boolean 
  loading:boolean
  options: DataTables.Settings = {};
  trigger: Subject<User> = new Subject();
  users : User []
  selectedDelegue:User
  evaluations : Evaluation[]
  evalToDelete : Evaluation
  evalToAdd : Evaluation
  loadUsers : boolean
  noteDelegeTotal : number
  // chart
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' ,backgroundColor: "transparent" , fill:true },
  ];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#adb5bd',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {}
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private userv:UserService, private evalserv:EvalService) { }

  ngOnInit() {
    this.users = []
    this.evaluations =[]
    this.ajout = false
    this.modification = false
    this.addError = false
    this.loading = true
    this.loadUsers = true
    this.noteDelegeTotal = 0
    this.evalToAdd = {} as Evaluation
    this.initReviewForm(this.evalToAdd)
    this.options = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    setTimeout(()=>{
      this.userv.getAllDeleges().subscribe((res:User[])=>{
      this.users = res
      this.trigger.next()
      this.loading = false
      this.loadUsers = false
    })
    },3000)
    
  } 
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  cancelEditionOrAdd(){
    this.ajout = false
    this.modification = false
  }
  initReviewForm(evalt:Evaluation){
    evalt.administratif = 0
    evalt.ciblage = 0
    evalt.conaissance_concurrence = 0
    evalt.conaissance_produit = 0
    evalt.conclusion = 0
    evalt.ecoute = 0
    evalt.etablir_securite = 0
    evalt.exp_orale = 0
    evalt.feedback_prescrip = 0
    evalt.gestuelle = 0
    evalt.maitrise_clients = 0
    evalt.maitrise_terrain = 0
    evalt.mise_en_place = 0
    evalt.nego_pack = 0 
    evalt.note_globale = 0
    evalt.observation = 0
    evalt.plan_journee = 0
    evalt.prop_voiture = 0
    evalt.questionnement = 0
    evalt.traitement_objections = 0
    evalt.utilisation_mp = 0
    evalt.presentation = 0
  }
  addReview(grForm:NgForm){
    this.evalserv.add(this.evalToAdd,this.selectedDelegue.email).subscribe(res=>{
      window.location.reload()
    },err=>this.addError = true)
  }
  updateReview(grForm:NgForm){
    this.evalserv.update(this.evalToAdd).subscribe(res=>{
      window.location.reload()
    },err=>this.addError = true)
  }
  showDetails(c){
    this.loading = true
    this.noteDelegeTotal = 0
    this.evalserv.getEvalsOfdeleg(c.id).subscribe((res:Evaluation[])=>{
        this.selectedDelegue = c 
        if(res.length > 0){
          let n = 0
          res.forEach(element => {
              n += element.note_globale
          });
          this.noteDelegeTotal = n / res.length
        }  
        this.evaluations = res
        this.loading = false
      })
    
  }
  evaluer(){
    this.evalToAdd = {} as Evaluation
    this.initReviewForm(this.evalToAdd)
    this.ajout = true
    this.modification = false
  }
  calculMoy(){
    this.evalToAdd.note_globale = (this.evalToAdd.administratif + this.evalToAdd.ciblage
     + this.evalToAdd.conaissance_concurrence + this.evalToAdd.conaissance_produit 
     + this.evalToAdd.conclusion + this.evalToAdd.ecoute + this.evalToAdd.etablir_securite 
     + this.evalToAdd.exp_orale + this.evalToAdd.feedback_prescrip + this.evalToAdd.gestuelle 
     + this.evalToAdd.maitrise_clients + this.evalToAdd.maitrise_terrain 
     + this.evalToAdd.mise_en_place + this.evalToAdd.nego_pack + this.evalToAdd.observation
     + this.evalToAdd.plan_journee + this.evalToAdd.prop_voiture + this.evalToAdd.questionnement
     + this.evalToAdd.traitement_objections + this.evalToAdd.utilisation_mp + this.evalToAdd.presentation) / 20
  }
  editEval(ev){
    this.evalToAdd = ev
    this.ajout = false
    this.modification = true
  }
  ngOnDestroy(): void {
    this.trigger.unsubscribe();
  }
}
