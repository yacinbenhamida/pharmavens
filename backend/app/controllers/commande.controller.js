const Commande = require('../models').commandes
const CommandeProduit = require('../models').commandeproduits
const Produit = require('../models').produits
const Client = require('../models').clients
const User = require('../models').users

exports.addCommande = (req,res) => {
    const commande = req.body.commande
    const produits = req.body.produits
    const emetteur = req.body.emetteur
    if(commande && produits){
        Commande.create(commande, {w: 1}, { returning: true }).then(cmd=>{
        if(cmd){
            // finding the user
            if(emetteur){
                User.findOne({where : {email : emetteur}}).then(user=>{
                cmd.setEmetteur(user)
                cmd.save()
            }) 
            }
            // affectation client
            const cli = commande.client
            if(cli){
                Client.findOne({where : {id : cli.id}}).then(client=>{
                cmd.setClient(client)
                cmd.save()
            })
            }
            produits.forEach(element => {
                Produit.findOne({where : {id : element.produit}}).then(prod=>{
                    if(prod){
                        let pttc = 0
                        if(element.reduction){
                            pttc = ((prod.prix) - (prod.prix*(element.reduction/100)))* element.quantite
                        }
                        else pttc = prod.prix * element.quantite
                        const commande_produit = {
                            idproduit : prod.id,
                            idcommande : cmd.id,
                            quantite : element.quantite ? element.quantite : 0,
                            remise : element.reduction? element.reduction : 0,
                            prixTTC : pttc
                        }
                        CommandeProduit.create(commande_produit,{ w: 1 }, { returning: true }).then(cp=>{
                            if(cp) console.log({message : 'added products'})
                            else console.log({message : 'failed to add products'})       
                        })
                        Produit.increment('times_sold', { by: 1, where: { id: prod.id }}).then(r=>{
                            console.log({message : 'incremented successfuly'})
                        })
                        return res.send({message : 'added succ'})
                    } 
                })
            });
        }
    })
    }
    else return res.status(404)        
    
}
exports.getAllCommandes = (req,res) => {
    Commande.findAll({include: ['client','emetteur']}).then(result=>{
        res.send(result)
    })
}
exports.getProduitsOfCommande = (req,res)=>{
    const commandeId = req.body.commande
    CommandeProduit.findAll({where : {idcommande : commandeId }, include: [{
        model: Produit,
        as: 'produits',
        required: false,
        attributes: ['id', 'libelle','prix','nb_gellules'],
        through: {
          model: CommandeProduit,
          as: 'commandeProduit',
          attributes: ['quantite','remise','prixTTC'],
        }
      }]}).then(cmd=>{
        return res.send(cmd)
    })
}
exports.deleteCommande = (req,res) => {
    const commandeId = req.body.commandeId
    Commande.findOne({where : {id : commandeId}}).then(cmd=>{
        if(cmd){
            const products = cmd.getProduits()
            cmd.removeProduits(products)
            Commande.destroy({
                where : {
                    id : commandeId
                }
            }).then(exec=>{
                return res.send({message : 'done'})
            })
        }
        else return res.status(404)
    })
}