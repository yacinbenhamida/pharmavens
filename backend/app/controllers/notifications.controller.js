const Notification = require('../models').notifications
const User = require('../models').users
const Task = require('../models').task
exports.addNotification = (req,res)=>{
    const content = req.body.notif.content 
    const title = req.body.notif.title   
    const targetsId = req.body.targets
    const senderEmail = req.body.sender
    const taskId = req.body.taskId
    if(title && content && targetsId && senderEmail && taskId){
        // sender
        User.findOne({where : {email : senderEmail}}).then(sender=>{
            if(sender && targetsId.length > 0){
                targetsId.forEach(targId=>{
                    User.findOne({where : {id : targId}}).then(reciever=>{
                        if(reciever){
                            Task.findOne({where : {id : taskId}}).then(task=>{
                                if(task){
                                    const notif = {
                                        titre : title,
                                        contenu :content,
                                        taskId : task.id,
                                        recieverId : reciever.id,
                                        senderId : sender.id,
                                        seen : false,
                                    }
                                    Notification.create(notif,{w:1},{returning : true}).then(result=>{
                                        if(result) console.log({message : 'inserted notif'})
                                    })
                                } else return res.status(404).send({message : 'error - no task'})
                            })
                        }return res.status(404).send({message : 'error - no recieve'})
                    })                   
                })
                return res.status(200).send({message : 'notified'})
            }
            else return res.status(405).send({message : 'no sender'})
        })
    }
    else return res.status(405).send({message : 'no params'})
} 

exports.getNotificationsOfUser = (req,res)=>{
    const userEmail = req.body.email
    User.findOne({where : {email : userEmail}}).then(user=>{
        if(user){
            Notification.findAll({where : {recieverId : user.id}, include : ['reciever','sender','subject'],order:[['createdAt', 'ASC']]}).then(
                notifs=>{
                    return res.send(notifs)
                }
            )
        }else return res.status(403).send({message : 'not allowed'})
    })
}
exports.setNotificationSeen = (req,res)=>{
    const userEmail = req.body.email
    User.findOne({where : {email : userEmail}}).then(user=>{
        if(user){
            Notification.destroy({seen : true},{where : {recieverId : user.id}}).then(
                notifs=>{
                    return res.status(200).send({message : 'done'})
                }
            )
        }else return res.status(403).send({message : 'not allowed'})
    })
}
exports.deleteNotif = (req,res)=>{
    const id = req.body.id
    Notification.findOne({where : {id : id}}).then(user=>{
        if(user){
            Notification.destroy({where : {id : user.id}}).then(
                notifs=>{
                    return res.status(200).send({message : 'done'})
                }
            )
        }else return res.status(403).send({message : 'not allowed'})
    })
}