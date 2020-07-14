import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Rapport } from '../models/rapport.model';
import { RapportService } from '../services/rapport.service';
import { RapportDelegue } from '../models/rapportdelege.model';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  trigger: Subject<Rapport> = new Subject();
  selectedRapportToDelete : Rapport
  selectedRapportToEdit : Rapport
  input : any
  rapports : Rapport[] 
  showForm:boolean
  addError:boolean
  constructor(private rapportservice:RapportService) { }

  ngOnInit() {
    this.rapports = []
    this.showForm = false
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.addError = false
    this.rapportservice.getAll().subscribe((r:Rapport[])=>{
      this.rapports = r
      this.trigger.next()
    })
  }
  deleteReport(){
    this.rapportservice.delete(this.selectedRapportToDelete.id).subscribe((res)=>window.location.reload())
  }
  showPanel(){
    this.input  = {
      report :  null,
      op : 'add'
    }
    this.showForm = true
  }
  hidePanel(){
    this.showForm = false
  }
  editReport(g){
    this.rapportservice.getRdOfRapport(g.id).subscribe((res:RapportDelegue)=>{
      this.input  = {
        report :  g,
        rapport_delege : res,
        op : 'modif'
      }
      this.showForm = true
    })

  }
}
