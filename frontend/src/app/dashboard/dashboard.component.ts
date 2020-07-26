import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { StatService } from '../services/stats.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public stats:any = {}
  year : Date = new Date()
   // chart
   public lineChartData: ChartDataSets[] = [
    {},
  ];
  public barChartData: ChartDataSets[] = [
    {},
  ];
  public lineChartColors: Color[] = [
    {   
      borderColor: '#1269cb"',
      pointBackgroundColor: '#1269cb',
      pointBorderColor: '#1269cb',
      backgroundColor : 'white',
      pointHoverBackgroundColor: '#1269cb',
      pointHoverBorderColor: '#1269cb'
    },
  ];
  public barChartColors: Color[] = [
    {   
      borderColor: '#1269cb"',
      pointBackgroundColor: '#1269cb',
      pointBorderColor: '#1269cb',
      backgroundColor : '#1269cb',
      pointHoverBackgroundColor: '#1269cb',
      pointHoverBorderColor: '#1269cb'
    },
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio : false,  
    scales: {
      xAxes: [{}],
      yAxes: [ {gridLines : {color : "transparent"}}]
    },
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
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
  public lineChartLabels: Label[] = [];
  barChartLabels : Label[] = []
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private uservice: UserService,private statserv:StatService) { }
  
  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
    localStorage.removeItem('foo') 
    this.statserv.getAll().subscribe((res:any)=>{
      this.stats = res
      let lineTab:any = []
      if(res.bymonth.length > 0){
        for (let index = 0; index < res.bymonth.length; index++) {
          this.lineChartLabels.push(res.bymonth[index].month)
          lineTab.push({ data: res.bymonth[index].sum, label: 'Ventes (TND)', fill : true})
        }
      }
      else {
        this.lineChartLabels.push('mois')
        lineTab.push({data : 0, label: 'Ventes (TND)', fill : true})
      }      
      this.lineChartData = lineTab
      let tabBar:any = []
      if (res.bydeleg.length > 0) {
        for (let index = 0; index < res.bydeleg.length; index++) {
          this.barChartLabels.push(res.bydeleg[index].user)
          tabBar.push({ data: res.bydeleg[index].nbc, label: 'Nombre commandes', fill: true })
        }
      } else {
        this.barChartLabels.push('délégué')
        tabBar.push({ data: 0, label: 'Ventes (TND)', fill: true })
      }
      this.barChartData = tabBar
    })
  }
}

}
