const Pack = require('../models').packs
const PackProduit = require('../models').packsproduits
const Produit  = require('../models').produits
exports.addPack = (req, res)=> {
    const pack = req.body.pack;
    const packproduits = req.body.produits
    if(pack){
        pack.times_sold = 0
        Pack.create(pack,{w:1}, { returning: true }).then(respack=>{
            if(respack && packproduits){
                packproduits.forEach(element => {
                    Produit.findAll({ where : {id : element.produit}}).then(produit=>{
                        if(produit){
                            const prodpack = {
                                idpack : respack.id,
                                id_produit : element.produit,
                                quantite : element.quantite,
                                isfree : element.gratuit,
                            }
                            PackProduit.create(prodpack,{w:1}, { returning: true }).then(
                                finalresult=> {
                                    console.log({message : 'inserted product pack'})                                    
                                }
                            )
                        }
                    })
                });  
            }else console.log('no packs , must be simple pack')
        })
        res.send({message : 'done'})
    }
    else res.status(405)
}
exports.getProductsOfPack = (req,res) => {
    const packId = req.body.pack
    if(packId){
        PackProduit.findAll({where : {idpack : packId}, include: [{
            model: Produit,
            as: 'produits_packs',
            required: false,
            attributes: ['id', 'libelle','prix','nb_gellules'],
            through: {
              model: PackProduit,
              as: 'packproduit',
              attributes: ['quantite','createdAt','isfree'],
            }
          }]}).then(packs=>{
            res.send(packs)
        })
    }else res.status(404)
}
exports.incrmentPackSold = (req,res)=>{
    const packId = req.body.pack
    if(packId){
        PackProduit.findOne({where : {idpack : packId}}).then(pack=>{
            if(pack){
                Pack.increment('times_sold', { by: 1, where: { id: pack.id }}).then(d=>res.status(200))
            }
        })
}
else res.status(404)
}
exports.getAllPacks = (req,res)=>{
    Pack.findAll().then(result=>{
        res.send(result)
    })
}
exports.getVisiblePacks = (req,res)=>{
    Pack.findAll({where : {visible : true}}).then(result=>{
        res.send(result)
    })
}
exports.deletePack = (req,res) => {
    const packId = req.body.packId
    Pack.findOne({where : {id : packId}}).then(cmd=>{
        if(cmd){
            Pack.destroy({
                where : {
                    id : packId
                }
            }).then(exec=>{
                res.send({message :'done' })
            })
        }
        else res.status(404)
    })
}
exports.togglePack = (req,res)=>{
    const packId = req.body.packId
    Pack.findOne({where : {id : packId}}).then(pack=>{
        if(pack){
            Pack.update({visible : !pack.visible},{
                where : {
                    id : pack.id
                }
            }).then(exec=>{
                res.send({message :'done' })
            })
        }
        else res.status(404)
    })
}