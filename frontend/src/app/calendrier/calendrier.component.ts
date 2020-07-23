import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  collapseAnimation,
} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
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
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
  animations : [collapseAnimation]
})
export class CalendrierComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;
  loading : boolean 
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();

  events : CalendarEvent[] = []
  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, private taskserv:TaskService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }
  ngOnInit(){
     this.taskserv.getAll().subscribe((res:Task[])=>{
      this.loading = true
      let ev = []
      res.forEach((elem:Task)=>{
        console.log(elem)
        ev.push({ 
          start: new Date(elem.date_echance),
          end : new Date(elem.date_echance),
          title: elem.nom_tache,
          color: colors.blue,
          allDay: true,
        }
          )
      })
      this.events = ev
      this.loading = false
    })
  }
}