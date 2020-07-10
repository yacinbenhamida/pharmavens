const Reunion = require('../models').reunions
const User = require('../models').users
exports.addReunion = (req,res)=>{
    let reun = req.body.reunions
    const email = req.body.email
    User.findOne({where : {email : email}}).then(user=>{
        if(user && reun){
            reun.added_by = user.nom +' '+user.prenom
            Reunion.create(reun,{w:1},{returning : true}).then(d=>{
                return res.send(d)
            })
        }else return res.send({message : 'error'})
    })
}
exports.getAll = (req,res) => {
    Reunion.findAll().then(d=>res.send(d))
}

exports.delete = (req,res) => {
    Reunion.destroy({where : {id : req.body.id}}).then(d=>res.send(d)).catch((e)=>res.send({message : 'err'}))
}
exports.edit = (req,res) => {
    Reunion.update(req.body.reun,{where : {id : req.body.reun.id }}).then(d=>{
        return res.send(d)
    }).catch(err=>res.send({message : 'err'}))
}