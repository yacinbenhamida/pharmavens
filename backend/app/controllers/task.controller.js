const Task = require('../models').task
const UserTask = require('../models').usertask
const User = require('../models').users
const Disponibilite = require('../models').disponibilite
const sequelize = require("../models").Sequelize;

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
exports.setTaskToPrivate = (req,res) => {
    const taskId = req.body.id
    const state = req.body.state
    if(taskId && state != null && state != undefined){
        Task.findOne({where : {id : taskId}}).then(x=>{
            if(x){
                Task.update({private : state}, {where : {id : x.id}}).then(t=>{
                    return res.status(200).send({message : 'done'})
                })
            }
            else return res.status(404).send({message : 'param missing'})
        })
        
    }
    else return res.status(405).send({message : 'error'})
}
exports.getPlannings = (req,res)=>{
    const iduser = req.params.iduser
    if(iduser){
        User.findOne({where : {id: iduser}}).then(targetuser=>{
            if(targetuser){
                UserTask.findAll({include: [{
                    model: User,
                    as: 'task_users',
                    required: false,
                    attributes: ['id', 'nom','prenom','email','imageUrl','telephone','telephone_perso','status','role'],
                  },{
                    model: Task,
                    as: 'ut_tasks',
                    required: false,
                    attributes: ['id', 'nom_tache','date_rappel','date_echance','attached_file','isdone','private']
                  }]}).then(ut=>{
                      if(ut){
                          Disponibilite.findAll({include: [{
                        model: User,
                        as: 'user'}]},{attributes : [
                            "id",
                            [sequelize.fn('date_format', sequelize.col('date_debut'), '%d/%m/%y'), 'date_debut'],
                            [sequelize.fn('date_format', sequelize.col('date_fin'), '%d/%m/%y'), 'date_fin'],
                            'remarques','intitule' , 'date_debut','date_fin'
                        ]}).then(dispos=>{
                            let result = []
                            ut.forEach(tache=>{
                                if(tache.ut_task && (tache.ut_tasks[0].private == false || targetuser.role == "admin" || targetuser.id ==tache.task_users[0].id) ){
                                    result.push({
                                        type : 'task',
                                        id : tache.id,
                                        user : tache.task_users[0],
                                        task : tache.ut_tasks[0]
                                    })
                                }                             
                            })
                            if(dispos && dispos.length > 0  && targetuser.role != "admin"){
                                dispos.forEach(element => {
                                    if(element.user.role != 'admin') {
                                        result.push({
                                            type : 'dispo',
                                            id : element.id,
                                            intitule : element.intitule,
                                            user : element.user,
                                            date_debut : element.date_debut,
                                            date_fin : element.date_fin,
                                            remarques: element.remarques
                                        })
                                    }
                                });
                            }else if(dispos && dispos.length > 0 ){
                                dispos.forEach(element => {
                                        result.push({
                                            type : 'dispo',
                                            id : element.id,
                                            intitule : element.intitule,
                                            date_debut : element.date_debut,
                                            date_fin : element.date_fin,
                                            user : element.user,
                                            remarques: element.remarques
                                        })
                                })
                            }   
                            return res.send(result)
                    })
                      }
                })
            }
        })
        
    }
       
}

exports.getPlanningsOfUser = (req,res)=>{
    const iduser = req.params.iduser
    if(iduser){
        User.findOne({where : {id: iduser}}).then(targetuser=>{
            if(targetuser){
                UserTask.findAll({where : {idDelegue : targetuser.id},include: [{
                    model: User,
                    as: 'task_users',
                    required: false,
                    attributes: ['id', 'nom','prenom','email','imageUrl','telephone','telephone_perso','status','role'],
                  },{
                    model: Task,
                    as: 'ut_tasks',
                    required: false,
                    attributes: ['id', 'nom_tache','date_rappel','date_echance','attached_file','isdone','private']
                  }]}).then(ut=>{
                      if(ut){
                          Disponibilite.findAll({where : {user_id : targetuser.id},include: [{
                        model: User,
                        as: 'user'}]},{attributes : [
                            "id",
                            [sequelize.fn('date_format', sequelize.col('date_debut'), '%d/%m/%y'), 'date_debut'],
                            [sequelize.fn('date_format', sequelize.col('date_fin'), '%d/%m/%y'), 'date_fin'],
                            'remarques','intitule' , 'date_debut','date_fin'
                        ]}).then(dispos=>{
                            let result = []
                            ut.forEach(tache=>{
                                if(tache.ut_tasks && tache.task_users && (tache.ut_tasks[0].private == false || targetuser.role == "admin" || targetuser.id ==tache.task_users[0].id )){
                                    result.push({
                                        type : 'task',
                                        id : tache.id,
                                        user : tache.task_users[0],
                                        task : tache.ut_tasks[0]
                                    })
                                }                             
                            })
                            if(dispos && dispos.length > 0){
                                dispos.forEach(element => {
                                        result.push({
                                            type : 'dispo',
                                            id : element.id,
                                            intitule : element.intitule,
                                            user : element.user,
                                            date_debut : element.date_debut,
                                            date_fin : element.date_fin,
                                            remarques: element.remarques
                                        })
                                });
                            }  
                            return res.send(result)
                    })
                      }
                })
            }
        })
        
    }
       
}
exports.addPlanning = (req,res)=>{
    const planning = req.body.planning
    const userId = req.body.user
    if(planning && userId){
        User.findOne({where : {id : userId}}).then(user=>{
            if(user){
                planning.user_id = user.id
                Disponibilite.create(planning,{returning : true}).then(dispo=>{
                    if(dispo){
                        return res.send({message : 'added'})
                    }
                    else return res.status(404)
                })
            }
            else return res.status(404)
        })
    }
    else return res.status(404)
}
exports.deletePlanning = (req,res)=>{
    const id = req.body.id
    if(id){
        Disponibilite.destroy({where : {id : id}}).then(task=>res.send({message : 'done'}))
    }else return res.status(404)
}
exports.editPlanning = (req,res)=>{
    const planning = req.body.planning
    const userId = req.body.user
    if(planning && userId){
        User.findOne({where : {id : userId}}).then(user=>{
            if(user){
                planning.user_id = user.id
                Disponibilite.update(planning,{where : {id : planning.id}},{returning : true}).then(dispo=>{
                    if(dispo){
                        return res.send({message : 'updated'})
                    }
                    else return res.status(404)
                })
            }
            else return res.status(404)
        })
    }
    else return res.status(404)
}
// display planning for simple user
exports.getDisponibilitesForSimpleUser = (req,res)=>{
    Disponibilite.findAll({include: [{
        model: User,
        as: 'user'}]}).then(dispos=>{
            let result = []
            if(dispos && dispos.length > 0 ){
                dispos.forEach(element => {
                    if(element.user.role != 'admin') result.push(element)
                });
            }       
            return res.send(result)
    })
}
exports.getDisponibilitesForAdmin = (req,res)=>{
    Disponibilite.findAll({include: [{
        model: User,
        as: 'user'}]}).then(dispos=>{
            return res.send(dispos)
    })
}