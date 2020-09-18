import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale("fr", frLocale);
declare var $ : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  collapsedNavbar : boolean 
  constructor(public router : Router,private localeService: BsLocaleService){
    
  }
  ngOnInit(): void {
    this.collapsedNavbar = true
    this.localeService.use('fr');
  }
  handlehideNav($event){
      //$('#sidebar').collapse('hide');
      //$('.sidebar-content').collapse('hide');
      //this.collapsedNavbar = !this.collapsedNavbar
  }
}
