const Rapport = require('../models').rapports
const RapportDelege = require('../models').rapportsdelege
const User =  require('../models').users
exports.addRapport =  (req,res)=>{
    let rapport = req.body.rapport
    let rapport_data = req.body.rapport_data
    const email = req.body.email
    if(rapport && rapport_data && email){
        User.findOne({where : {email : email}}).then(user=>{
            if(user){
                rapport.ownerId = user.id
                Rapport.create(rapport,{w:1},{returning : true}).then(rapp=>{
                    if(rapp){
                        rapport_data.forEach(element=>{
                            User.findOne({where : {id : element.idDelegue}}).then(delege=>{
                                if(delege){
                                   element.idDelegue = delege.id
                                   element.idRapport = rapp.id
                                   RapportDelege.create(element,{w:1},{returning : true}).then(rd=>{
                                       console.log({message : 'add new rd row'})
                                   })
                                }
                            })
                        })
                        return res.send({message : 'done'})
                    }
                })
            }else return res.send({message : 'no user'})
        })
    }else return res.send({message : 'no params'})
}
exports.getAll = (req,res) => {
    Rapport.findAll().then(d=>res.send(d))
}
exports.getRDOfReport = (req,res)=>{
    const reportId = req.body.report
    if(reportId){
        RapportDelege.findAll({where : {idRapport : reportId}, include: [{
            model: User,
            as: 'rapport_delege',
            required: false,
            attributes: ['id', 'nom','prenom','email','imageUrl','telephone','telephone_perso','status','role'],
            through: {
              model: RapportDelege,
              as: 'rapport_delege',
              attributes: ['id','idRapport','idDelegue'
              ,'manifestation','conges','nb_jours_conges','realise_obj_1',
            'realise_obj_2','total_realise','pharma_gro_realisees','realise_ventes'
        ,'rapport_envoye','respect_plan_tournee','visite_detail','promesse_packs'
        ,'respect_plan_charge','remarques_pertinentes','veille_c','capture_ecran'
    ,'pourcentage_satisfaction','createdAt','updatedAt'],
            }
          }]}).then(ut=>{
            return res.send(ut)
        })
    }else return res.status(404)
}
exports.delete = (req,res) => {
    Rapport.destroy({where : {id : req.body.id}}).then(d=>res.send({message : 'done'})).catch((e)=>res.send({message : 'err'}))
}
exports.edit = (req,res) => {
    let rapport = req.body.rapport
    let rapport_data = req.body.rapport_data
    const email = req.body.email
    const deletable = req.body.deletable
    if(rapport && rapport_data && email){
        User.findOne({where : {email : email}}).then(user=>{
            if(user){
                rapport.ownerId = user.id
                Rapport.update(rapport,{where : {id : rapport.id}},{returning : true}).then(rapp=>{
                    if(rapp){
                        if(deletable && deletable.length > 0){
                            deletable.forEach(row=>{
                                RapportDelege.destroy({where : {id : row.id}}).then(dest=>{
                                    console.log('found & deleted')
                                })
                            })
                        }
                        rapport_data.forEach(element=>{
                            if(element.idDelegue){
                                User.findOne({where : {id : element.idDelegue}}).then(delege=>{
                                if(delege && element.id){
                                   RapportDelege.findOne({where : {id : element.id }}).then(existing=>{
                                        if(existing){
                                            RapportDelege.update(existing,{where : {id : element.id}},{returning : true}).then(val=>{
                                                if(val) console.log({message : 'rd  found & updated'})
                                            })
                                        }
                                   })                                
                                }else if(delege){
                                    element.idRapport = rapport.id
                                    RapportDelege.create(element,{w:1},{returning : true}).then(rd=>{
                                        console.log({message : 'rd not found created new rd row'})
                                    })
                                }
                            })
                            }
                            
                        })
                        return res.send({message : 'done'})
                    }
                })
            }else return res.send({message : 'no user'})
        })
    }else return res.send({message : 'no params'})
}
