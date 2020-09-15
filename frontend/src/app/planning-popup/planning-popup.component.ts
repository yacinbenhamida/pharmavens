import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Disponibilite } from '../models/disponibilite.model';
import { TaskService } from '../services/task.service';
import { User } from '../models/user.model';
declare var $ : any;

@Component({
  selector: 'app-planning-popup',
  templateUrl: './planning-popup.component.html',
  styleUrls: ['./planning-popup.component.css']
})
export class PlanningPopupComponent implements OnInit {
  @Input() planning : Disponibilite 
  @Input() user : User
  @Input() edit : boolean
  @Output() source = new EventEmitter<string>();
  constructor(private taskServ:TaskService) { }

  ngOnInit() {
  }
  showModal(){
    this.source.emit('new');
    $('#centeredModalPrimary').modal('show')
  }
  hideModal(){    
    $('#centeredModalPrimary').modal('hide')
  }
  addPlan(){
    if(this.edit == false){
      this.taskServ.addPlanning(this.planning,this.user.id).subscribe(res=>window.location.reload())
    }
    else{
      this.taskServ.editPlanning(this.planning,this.user.id).subscribe(res=>window.location.reload())
    }
  }
  deletePlan(){
    if(confirm('êtes vous sûr(e) de vouloir supprimer ce planning ?')){
      this.taskServ.deletePlanning(this.planning.id).subscribe(res=>window.location.reload())
    }
  }
  emitOutput(){

  }
}
