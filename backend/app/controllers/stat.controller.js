const { rapports } = require('../models')

const Rapport = require('../models').rapports
const RapportDelege = require('../models').rapportsdelege
const User = require('../models').users
const Produit = require('../models').produits
const Task = require('../models').task
const Pack = require('../models').packs
const Commande = require('../models').commandes
const CommandeProduit = require('../models').commandeproduits
const Sequelize = require('../models').Sequelize

exports.getStats = (req, res) => {
    CommandeProduit.findAll().then(nbprod => {
        Commande.findAll().then(commandes => {
            Task.findAll().then(tasks => {
                User.findAll().then(users => {
                    Rapport.findAll().then(r => {
                        Pack.findAll().then(packs => {
                            let sum = 0
                            packs.forEach(element => {
                                sum += element.times_sold
                            });
                            res.send({
                                nbprod: nbprod.length, nbpacks: sum
                                , cmd: commandes.length, tasks: tasks.length,
                                rapports: r.length, users: users.length
                            })
                        })
                    })
                })

            })


        })

    })
}