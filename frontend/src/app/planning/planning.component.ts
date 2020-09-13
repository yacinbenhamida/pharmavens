import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
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
interface Film {
  id: number;
  title: string;
  release_date: string;
}

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
  constructor(private http: HttpClient,private taskserv:TaskService,private userv:UserService) {}

  ngOnInit(): void {
    this.user = {} as User
    this.fetchEvents();
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
      this.events$ = this.taskserv.getAllPlannings()
      .pipe(
        map(( results: Task[] ) => {
          return results.map((tasks: any) => {
            return {
              start: new Date(tasks.ut_tasks[0].date_echance),
              end : new Date(tasks.ut_tasks[0].date_echance),
              title: tasks.task_users[0].nom+' '+tasks.task_users[0].prenom+' ('+tasks.task_users[0].role+') : '+ tasks.ut_tasks[0].nom_tache , 
              color: tasks.task_users[0].id == user.id ? colors.yellow : colors.blue,
              allDay: true,
              meta : tasks.id,
              user : tasks.task_users[0].id
            };
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
    if(event.user == this.user.id || this.user.role == "admin" || this.user.role == "superviseur" ){
      window.open(
        `https://gestionfarmavans.com/discussion/${event.meta}`,
        '_blank'
      );
    }
    
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }
}
