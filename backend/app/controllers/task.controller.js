const Task = require('../models').task
const UserTask = require('../models').usertask
const User = require('../models').users
exports.addTask = (req,res) => {
    const task = req.body.task
    const users = req.body.users
    if(task && users){
        Task.create(task,{returning : true}).then(ctask=>{
            if(ctask){
                users.forEach(element => {
                    User.findOne({where : {id : element.delege}}).then(user=>{
                        if(user){
                            const ut = {
                                idDelegue : user.id,
                                idTache : ctask.id,
                            }
                            UserTask.create(ut,{returning : true}).then(f=>{
                                console.log({message : 'added new utask'})
                            })
                        }else console.log({message : 'failed to add new utask'})
                    }).catch(function(err) {
                        // print the error details
                        console.log({message : err});
                    });
                });
                return res.status(200).send({message : 'done'})
            }else return res.status(401)
        }).catch(function(err) {
            // print the error details
            console.log({message : err});
        });
    }else return res.status(403)
}

exports.getAllTasks = (req,res)=>{
    Task.findAll().then(data=>res.send(data))
}

exports.getUTofTask = (req,res)=>{
    const taskId = req.body.task
    if(taskId){
        UserTask.findAll({where : {idTache : taskId}, include: [{
            model: User,
            as: 'task_users',
            required: false,
            attributes: ['id', 'nom','prenom','email','imageUrl','telephone','telephone_perso','status','role'],
            through: {
              model: UserTask,
              as: 'userTask',
              attributes: ['id','idDelegue','idTache'],
            }
          }]}).then(ut=>{
            return res.send(ut)
        })
    }else return res.status(404)
}
exports.getTasksOFUser = (req,res)=> {
    const userId = req.body.user
    if(userId){
        UserTask.findAll({where : {idDelegue : userId}, include: [{
            model: Task,
            as: 'ut_tasks',
            required: false,
            attributes: ['id', 'nom_tache','date_echance','contenu','date_rappel','attached_file','isdone'],
            through: {
              model: UserTask,
              as: 'userTask',
            }
          }]}).then(ut=>{
            if(ut){
                return res.send(ut)
            }
            return res.status(404).send({message : 'no task'})
        })
    }else return res.status(404)
}
exports.deleteTask = (req,res)=>{
    const taskId = req.body.id
    if(taskId){
        Task.destroy({where : {id : taskId}}).then(task=>res.send({message : 'done'}))
    }else return res.status(404)
}
exports.updateTaskStatus = (req,res)=>{
    const taskId = req.body.id
    const state = req.body.state
    if(taskId && state != null && state != undefined){
        Task.findOne({where : {id : taskId}}).then(x=>{
            if(x){
                Task.update({isdone : state}, {where : {id : x.id}}).then(t=>{
                    return res.status(200).send({message : 'done'})
                })
            }
            else return res.status(404).send({message : 'param missing'})
        })
        
    }
    else return res.status(405).send({message : 'error'})
}

exports.getTask = (req,res)=>{
    const taskId = req.body.task
    if(taskId){
        Task.findOne({where : {id : taskId}}).then(task=>res.send(task))
    }else return res.status(404)
}
exports.getPlannings = (req,res)=>{
        UserTask.findAll({include: [{
            model: User,
            as: 'task_users',
            required: false,
            attributes: ['id', 'nom','prenom','email','imageUrl','telephone','telephone_perso','status','role'],
          },{
            model: Task,
            as: 'ut_tasks',
            required: false,
            attributes: ['id', 'nom_tache','date_rappel','date_echance','attached_file','isdone']
          }]}).then(ut=>{
            return res.send(ut)
        })
}