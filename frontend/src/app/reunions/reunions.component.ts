import { Component, OnInit } from '@angular/core';
import { Reunion } from '../models/reunion.model';
import { ReunionService } from '../services/reunion.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reunions',
  templateUrl: './reunions.component.html',
  styleUrls: ['./reunions.component.css']
})
export class ReunionsComponent implements OnInit {
  date : number = Date.now()
  reunion : Reunion = {} as Reunion
  showForm : boolean = true
  reunions : Reunion [] = []
  selectedReu : Reunion 
  edition : boolean = false
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Reunion> = new Subject();
  constructor(private rserv:ReunionService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true
    };
    this.rserv.getAll().subscribe((x:Reunion[])=>{
      this.reunions = x
      this.dtTrigger.next()
    })
  }
  submit(){
    this.rserv.add(this.reunion).subscribe(d=>{
      window.location.reload()
    })
  }
  edit(){
    this.rserv.update(this.reunion).subscribe(d=>{
      window.location.reload()
    })
  }
  setEditable(r){
    this.edition = true
    this.reunion = r
  }
  cancelEdition(){
    this.edition = false
    this.reunion = {} as Reunion
  }

  deleteReunion(){
    this.rserv.delete(this.selectedReu.id).subscribe(d=>{
      window.location.reload()
    })
  }
  
}
