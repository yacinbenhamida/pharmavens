const Evaluation = require('../models').evaluations
const User =  require('../models').users
exports.addEvaluation =  (req,res)=>{
    let evaluation = req.body.eval
    const email = req.body.email
    if(evaluation && email){
        User.findOne({where : {email : email}}).then(user=>{
            if(user && evaluation){
                evaluation.idDelegue = user.id
                Evaluation.create(evaluation,{w:1},{returning : true}).then(d=>{
                    return res.send(d)
                })
            }else return res.send({message : 'error'})
        })
    }else return res.send({message : 'error'})
}
exports.getAll = (req,res) => {
    Evaluation.findAll().then(d=>res.send(d))
}
exports.getEvalsOfdeleg = (req,res) => {
    Evaluation.findAll({where : {idDelegue : req.body.id}}).then(d=>res.send(d))
}

exports.delete = (req,res) => {
    Evaluation.destroy({where : {id : req.body.id}}).then(d=>res.send({message : 'done'})).catch((e)=>res.send({message : 'err'}))
}
exports.edit = (req,res) => {
    Evaluation.update(req.body.evaluation,{where : {id : req.body.evaluation.id }}).then(d=>{
        return res.send(d)
    }).catch(err=>res.send({message : 'err'}))
}