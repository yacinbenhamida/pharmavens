import { Component, OnInit } from '@angular/core';
import { Reunion } from '../models/reunion.model';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-reunions',
  templateUrl: './reunions.component.html',
  styleUrls: ['./reunions.component.css']
})
export class ReunionsComponent implements OnInit {
  date : number = Date.now()
  reunion : Reunion = {} as Reunion
  constructor(private rserv:ReunionService) { }

  ngOnInit() {
  }
  submit(){
    this.rserv.add(this.reunion).subscribe(d=>{
      console.log(d)
    })
  }

}
