const { rapports } = require('../models')

const Rapport = require('../models').rapports
const RapportDelege = require('../models').rapportsdelege
const User = require('../models').users
const Produit = require('../models').produits
const Task = require('../models').task
const Pack = require('../models').packs
const Commande = require('../models').commandes
const CommandeProduit = require('../models').commandeproduits
const Sequelize = require('../models').sequelize
const { QueryTypes } = require('sequelize');
exports.getStats = (req, res) => {
    CommandeProduit.findAll().then(nbprod => {
        Commande.findAll().then(commandes => {
            Task.findAll().then(tasks => {
                User.findAll().then(users => {
                    Sequelize.query("SELECT SUM(prix_total) as sum, WEEK(createdAt) as week FROM `commandes` WHERE YEAR(createdAt) = YEAR(CURDATE()) GROUP BY createdAt HAVING  week = WEEK(CURDATE())"
                        , { type: QueryTypes.SELECT }).then(weeklyIncome => {
                            Sequelize.query("SELECT SUM(prix_total) as sum FROM `commandes`", { type: QueryTypes.SELECT }).then(income => {
                                Sequelize.query("SELECT MONTHNAME(createdAt) as month,SUM(prix_total) as sum FROM `commandes` WHERE YEAR(createdAt) = YEAR(CURDATE()) GROUP BY MONTH(createdAt)", { type: QueryTypes.SELECT }).then(byMonth => {
                                    Sequelize.query("SELECT COUNT(c.id) as nbc, u.nom as user from commandes c,users u WHERE u.id = c.emetteurId AND YEAR(c.createdAt) = YEAR(CURDATE()) GROUP BY c.emetteurId", { type: QueryTypes.SELECT }).then(delegs => {
                                    Rapport.findAll().then(r => {
                                        Pack.findAll().then(packs => {
                                            let sum = 0
                                            packs.forEach(element => {
                                                sum += element.times_sold
                                            });
                                            res.send({
                                                nbprod: nbprod.length, nbpacks: sum
                                                , cmd: commandes.length, tasks: tasks.length,
                                                rapports: r.length, users: users.length,
                                                income: income && income.length > 0 ? income[0] : 0, weeklyIncome: weeklyIncome && weeklyIncome.length > 0 ? weeklyIncome[0].sum : 0,
                                                bymonth: byMonth && byMonth.length > 0 ? byMonth : 0 , bydeleg : delegs && delegs.length > 0 ? delegs : 0
                                            })
                                        })
                                    })
                                })
                            })
                        })
                        })
                })

            })


        })

    })
}