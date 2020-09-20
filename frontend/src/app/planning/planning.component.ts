import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { DatePipe,formatDate } from '@angular/common';
import * as moment from 'moment'
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.prod';
import { Disponibilite } from '../models/disponibilite.model';
import { Router } from '@angular/router';
declare var $ : any;


function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  orange : {
    primary : '#FFA500',
    secondary : '#FFA500'
  }
};
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  baseUrl : string = environment.backend.baseUrl;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  user : User
  events$: Observable<CalendarEvent<{ tasks: Task }>[]>;
  activeDayIsOpen: boolean = false;
  selectedPlanning : Disponibilite
  edit : boolean = false // when editing a plan this becomes true
  usersList : User[]
  filterUsersList:User[]
  selectedUser:number
  constructor(private http: HttpClient,private taskserv:TaskService,private userv:UserService, private router:Router) {}

  ngOnInit(): void {
    this.user = {} as User
    this.selectedPlanning = {} as Disponibilite
    this.usersList = []
    this.selectedUser = 0
    this.fetchEvents();
    this.userv.getAllUsers().subscribe((res:User[])=>{
      this.userv.getCurrentUser().subscribe((u:User)=>{
        this.usersList = res.filter(user=>user.id !== u.id)
        if(u.role == 'admin' || u.role == 'superviseur'){
          this.filterUsersList = res
        }else{
          this.filterUsersList = res.filter(user=> (user.role !== 'admin' && user.role !== 'superviseur'))
        }
      })
      
    })
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];
    this.userv.getCurrentUser().subscribe((user:User)=>{
      this.user = user
      this.events$ = this.taskserv.getAllPlannings(user.id)
      .pipe(
        map(( results: any[] ) => {
          return results.map((result: any) => {
            if(result.type == 'dispo'){
              return {
                start: new Date(result.date_debut),
                end : new Date(result.date_fin),
                title: result.user.nom+' '+result.user.prenom+' ('+result.user.role+') : '+ result.intitule  +' du '
                +result.date_debut + ' au '+result.date_fin, 
                color: result.user.id == user.id ? colors.orange : colors.red,
                allDay: true,
                user : result.user.id,
                meta : null,
                plan : result
              };
            }
            else{
                return {
                  start: new Date(result.task.date_rappel),
                  end : new Date(result.task.date_echance),
                  title: result.user.nom+' '+result.user.prenom+' ('+result.user.role+') : '+ result.task.nom_tache, 
                  color: result.user.id == user.id ? colors.yellow : colors.blue,
                  allDay: true,
                  meta : result.user.id,
                  user : result.user.id,
                  plan : null
                };
              
              
            }
          });
        })
      ); 
  })
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ task: Task }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event): void {
    if(event.meta && (event.user == this.user.id || this.user.role == "admin" || this.user.role == "superviseur") ){
      this.selectedPlanning = {} as Disponibilite
      this.edit = false
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/discussion/'+event.meta])
      );
      window.open(url, '_blank');
    }
    else if (event.plan && (event.user == this.user.id || this.user.role == "admin" || this.user.role == "superviseur")){
      this.selectedPlanning = event.plan
      this.edit = true;
      $('#centeredModalPrimary').modal('show');
    }
    
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }
  interceptEmit(event){
    if(event == 'new'){
      this.edit = false
      this.selectedPlanning = {} as Disponibilite
    }
  }
  filterCalendar(){
    if(this.selectedUser != 0){
    this.events$ = this.taskserv.getAllPlanningsOfUser(this.selectedUser)
      .pipe(
        map(( results: any[] ) => {
          return results.map((result: any) => {
            if(result.type == 'dispo'){
              return {
                start: new Date(result.date_debut),
                end : new Date(result.date_fin),
                title: result.user.nom+' '+result.user.prenom+' ('+result.user.role+') : '+ result.intitule  +' du '
                +result.date_debut + ' au '+result.date_fin, 
                color: colors.orange,
                allDay: true,
                user : result.user.id,
                meta : null,
                plan : result
              };
            }
            else{
                return {
                  start: new Date(result.task.date_rappel),
                  end : new Date(result.task.date_echance),
                  title: result.user.nom+' '+result.user.prenom+' ('+result.user.role+') : '+ result.task.nom_tache, 
                  color: colors.blue,
                  allDay: true,
                  meta : result.user.id,
                  user : result.user.id,
                  plan : null
                };
              
              
            }
          });
        })
      ); 
  }else{
    this.fetchEvents()
  }
}
}
