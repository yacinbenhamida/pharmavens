const Prospet = require('../models').prospet
const User = require('../models').users

exports.addProspet = (req,res)=>{
    const delegueId = req.body.userid
    const prospet = req.body.prospet
    if(delegueId && prospet){
        User.findOne({where : {id : delegueId}}).then(user=>{
            if(user){
                prospet.id_delegue = user.id
                Prospet.create(prospet,{returning : true}).then(result=>{
                    if(result){
                        return res.send({message : 'done'})
                    }
                })
            }
        })
    }
    else return res.status(404)
}

exports.editProspet = (req,res)=>{
    const prospet = req.body.prospet
    if(prospet){
            Prospet.update(prospet,{where : {id : prospet.id}}).then(result=>{
                if(result){
                        return res.send({message : 'done'})
                    }
                })
    }
    else return res.status(404)
}

exports.deleteProspet = (req,res)=>{
    const id = req.body.id
    if(id){
        Prospet.destroy({where : {id : id}}).then(task=>res.send({message : 'done'}))
    }
    else return res.status(404)
}

exports.getAllProspet = (req,res)=>{
    Prospet.findAll({include: [{
        model: User,
        as: 'delegue'}]}).then(props=>{
           return res.send(props)
        })
}
exports.getAllProspetOfUser = (req,res)=>{
    const id = req.body.id
    if(id){
        Prospet.findAll({where : {id_delegue : id}, include: [{
            model: User,
            as: 'delegue'}]}).then(props=>res.send(props))
    }
    else return res.status(404)
}

