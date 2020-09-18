import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NotificationService } from '../services/notif.service';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  user : User = {} as User
  messages : Notification[] = []
  @Input() navbarshown : boolean
  @Output() hideNav = new EventEmitter<boolean>()
  constructor(private router: Router, private userv:UserService
    , private nserv:NotificationService) { }
  ngOnInit() {
    if(this.userv.getCurrentUser()){
       this.userv.getCurrentUser().subscribe((res:any)=>{
      this.user.nom = res.nom
      this.user.prenom = res.prenom
      this.user.imageUrl = res.imageUrl
      this.user.email = res.email
      this.user.role = res.role
      this.loadMessages()
    })
  }
  }
  logout(){
      this.userv.logout().subscribe(res=>{
        localStorage.clear()
        sessionStorage.clear()
        this.router.navigate(['login'])
      })
      
  }
  loadMessages(){
    this.nserv.get(this.user.email).subscribe((res:Notification[])=>{
      this.messages = res
    })
  }

  redirectToChat(m:Notification){
    this.nserv.delete(m.id).subscribe(res=>{
      this.router.navigateByUrl('discussion/'+m.subject.id)
    })
  }
  hideNavbar(){
    this.navbarshown = ! this.navbarshown
    this.hideNav.emit(this.navbarshown)
  }
}
