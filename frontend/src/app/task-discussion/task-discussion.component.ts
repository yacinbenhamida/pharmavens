import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';
import { UserTask } from '../models/usertaks.model';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NotificationService } from '../services/notif.service';

@Component({
  selector: 'app-task-discussion',
  templateUrl: './task-discussion.component.html',
  styleUrls: ['./task-discussion.component.css']
})
export class TaskDiscussionComponent implements OnInit {
  targetTask : Task
  state$: Observable<object>;
  todos : UserTask[] = []
  commentsList : Comment [] = []
  connectedUser : User = null
  text:string 
  loading : boolean = false
  constructor(private activatedRoute: ActivatedRoute,
    private taskserv:TaskService, private router:Router,
    private commserv:CommentService, private userv:UserService, private notifserv:NotificationService) {}

  ngOnInit() {
    setTimeout(()=>{
      this.activatedRoute.paramMap.subscribe(x=>{
      this.taskserv.get(x.get('id')).subscribe((task:Task)=>{
        this.userv.getCurrentUser().subscribe((x:User)=>this.connectedUser = x)
        if(task){
          this.taskserv.getUTOFtask(Number(x.get('id'))).subscribe((todo:UserTask[])=>{
            if(todo){
              this.targetTask = task
              this.todos = todo
              this.commserv.getCommentsOfTask(this.targetTask.id).subscribe((comments:Comment[])=>{
                this.commentsList = comments                
                this.loading = false
              })
            }
          })
        }
        else this.router.navigateByUrl('/tasks')
      })
    })
    },2000)
    
  }
  sendComment(){
    this.loading = true
      this.commserv.add(this.text,this.targetTask.id).subscribe((comment:any)=>{      
        setTimeout(()=>{
          if(comment){
            let targetUsers = []
            this.todos.forEach(t=>{
              if(t.task_users[0].id != this.connectedUser.id){
                targetUsers.push(t.task_users[0].id)
              }
            })
            if(this.connectedUser.role != 'admin'){
              targetUsers.push(1)
            }
            if(targetUsers.length > 0){
              this.notifserv.add(comment.comment.content , "nouveau message" , targetUsers
               ,this.connectedUser.email, this.targetTask.id).subscribe(r=>{
              this.commentsList.push(comment.comment)
              this.loading = false
            })    
            }       
        }} ,5000)
      })
  }
  tap(){ return false}
  load(){
    this.loading = true
    this.ngOnInit()
  }
  updateTaskStatus(){
      this.taskserv.updateTaskStatus(this.targetTask.id,true).subscribe(x=>{
        this.router.navigateByUrl('/tasks')
      })
  }
  deleteMessage(message){
    this.commserv.delete(message.id).subscribe(x=>{
      this.load()
    })
  }

}
