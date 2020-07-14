import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StatService } from '../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public stats = {}
  constructor(private uservice: UserService,private statserv:StatService) { }
  
  ngOnInit() {
    this.statserv.getAll().subscribe(res=>{
      console.log(res)
      this.stats = res
    })
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
  }

}
