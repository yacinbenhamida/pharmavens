import { User } from './user.model';
import { Task } from './task.model';

export interface Notification {
    id : number
    senderId : number
    recieverId : number
    taskId : number
    contenu : string
    title : string
    reciever : User
    sender : User
    subject : Task
    seen : boolean
    createdAt : Date
}