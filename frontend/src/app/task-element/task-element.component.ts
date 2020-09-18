import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { UserTask } from '../models/usertaks.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {
  @Input() task:Task
  UToftask : UserTask[] = []
  @Output() handleDeletion = new EventEmitter<any>()
  connectedUser : User = {} as User
  constructor(private taskserv:TaskService, private router:Router, private userserv:UserService) { }

  ngOnInit() {
    this.userserv.getCurrentUser().subscribe((u:User)=>{
      if(u){
        this.connectedUser = u
        this.taskserv.getUTOFtask(this.task.id).subscribe((res:UserTask[])=>{
          this.UToftask = res
        })
      } 
    }) 
  }
  updateTaskStatus(){
      this.taskserv.updateTaskStatus(this.task.id,!this.task.isdone).subscribe(x=>{
        this.task.isdone = !this.task.isdone
      })
  }
  deleteTask(){
    this.handleDeletion.emit({
      task : this.task,
      op : 'del'
    })
  }
  disscuss(){
    this.router.navigateByUrl('/discussion/'+this.task.id)
  }
  changePrivate(){  
    this.taskserv.setTaskToPrivate(this.task.id,!this.task.private).subscribe(x=>{
      this.task.private = ! this.task.private
    })
  }
}
