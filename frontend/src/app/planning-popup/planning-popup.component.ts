import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Disponibilite } from '../models/disponibilite.model';
import { TaskService } from '../services/task.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
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
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  @Input() usersList : User []
  selectedUser: number
  constructor(private taskServ:TaskService,private userv:UserService) { }

  ngOnInit() {
    if(this.edit){
      this.selectedUser = this.user.id
    }
    else this.selectedUser = 0
    this.maxDate.setDate(this.maxDate.getDate() + 7);    
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
      if(this.selectedUser == 0){
        this.taskServ.addPlanning(this.planning,this.user.id).subscribe(res=>window.location.reload())
      }else{
        this.taskServ.addPlanning(this.planning,this.selectedUser).subscribe(res=>window.location.reload())
      }
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
