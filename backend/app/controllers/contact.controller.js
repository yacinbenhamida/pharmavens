const Contact = require('../models').contacts
const User =  require('../models').users
exports.addContact =  (req,res)=>{
    let contact = req.body.contact
    const email = req.body.email
    if(contact && email){
        User.findOne({where : {email : email}}).then(user=>{
            if(user && contact){
                contact.added_by = user.nom +' '+user.prenom
                Contact.create(contact,{w:1},{returning : true}).then(d=>{
                    return res.send(d)
                })
            }else return res.send({message : 'error'})
        })
    }else return res.send({message : 'error'})
}
exports.getAll = (req,res) => {
    Contact.findAll().then(d=>res.send(d))
}

exports.delete = (req,res) => {
    Contact.destroy({where : {id : req.body.id}}).then(d=>res.send({message : 'done'})).catch((e)=>res.send({message : 'err'}))
}
exports.edit = (req,res) => {
    Contact.update(req.body.contact,{where : {id : req.body.contact.id }}).then(d=>{
        return res.send(d)
    }).catch(err=>res.send({message : 'err'}))
}