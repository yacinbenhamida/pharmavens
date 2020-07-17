const Veille = require('../models').veille
const Produit = require('../models').produits
const User = require('../models').users
exports.addVeille = (req,res) => {
    const veille = req.body.veille
    const user = req.body.user
    if(veille){
        Veille.create(veille,{w : 1},{returning : true}).then(v=>{
            if(v){
                Produit.findOne({where : {id : veille.produit.id}}).then(prod=>{
                    if(prod){
                        v.setProduitCible(prod)
                        v.save()
                    }
                    else console.log('product not found')
                    User.findOne({where : {email : user}}).then(u=>{
                        if(u){
                            v.setAnalyseur(u)
                            v.save()
                        }else console.log('user not found')                        
                    })
                    res.send({message : 'done'})
                })
            }
        })
    }
    else res.status(403)
}

exports.getVeillesOfProduct = (req,res) => {
    const id = req.body.id
    Produit.findOne({where : {id : id}}).then(prod=>{
        if(prod){
           Veille.findAll({where : {produitCibleId : prod.id}}).then(veille=>{
        if(veille){
            return res.send(veille)
        }
    }) 
        }
        else return res.send({message : 'no data'})
    })
    
}
exports.getAll = (req,res) => {
    Veille.findAll({include: ['analyseur','produitCible']}).then(result=>{
        res.send(result)
    })
}
exports.delete = (req,res)=>{
    if(req.body.id){
        Veille.findOne({where : {id : req.body.id}}).then((v)=>{
            if(v) Veille.destroy({where : {id : v.id}}).then(d=>res.send({message : 'done'}))
            else res.status(404)
        })
    }
    
}