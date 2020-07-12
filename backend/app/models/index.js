const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.vehicules = require('./vehicule.model')(sequelize,Sequelize)
db.produits = require('./produit.model')(sequelize,Sequelize)
db.clients = require('./client.model')(sequelize,Sequelize)
db.packs = require('./pack.model')(sequelize,Sequelize)
db.packsproduits = require('./packproduit.model')(sequelize,Sequelize)
db.commandes = require('./commande.model')(sequelize,Sequelize)
db.commandeproduits = require('./commandeproduit.model')(sequelize,Sequelize)
db.veille = require('./veilleconcur.model')(sequelize,Sequelize)
db.task =  require('./task.model')(sequelize,Sequelize)
db.usertask =  require('./usertask.model')(sequelize,Sequelize)
db.comments = require('./comments.model')(sequelize,Sequelize)
db.notifications = require('./notification.model')(sequelize,Sequelize)
db.reunions =  require('./reunion.model')(sequelize,Sequelize)
db.contacts = require('./contact.model')(sequelize,Sequelize)
db.evaluations = require('./evaluation.model')(sequelize,Sequelize)
// relations

db.users.hasOne(db.vehicules)
db.vehicules.belongsTo(db.users)

db.clients.belongsTo(db.users,{as : 'delegue'})
db.commandes.belongsTo(db.clients, {as : 'client'})
db.commandes.belongsTo(db.users, {as : 'emetteur'})
db.veille.belongsTo(db.produits, {as : 'produitCible'})
db.veille.belongsTo(db.users, {as : 'analyseur'})
db.comments.belongsTo(db.users, {as : 'emitter'})
db.comments.belongsTo(db.task, {as : 'targetTask'})
db.notifications.belongsTo(db.users , {as : 'sender' , foreignKey : 'senderId'})
db.notifications.belongsTo(db.users , {as : 'reciever' , foreignKey : 'recieverId'})
db.notifications.belongsTo(db.task , {as : 'subject', foreignKey : 'taskId'})
db.evaluations.belongsTo(db.users , {as : 'delegue_evaluee', foreignKey : 'idDelegue'})
// join tbl commande produit
db.produits.belongsToMany(db.commandes,{
    through: 'commandeProduit',
    foreignKey: 'idproduit',
    otherKey: 'idcommande'
})
db.commandes.belongsToMany(db.produits,{
  through: 'commandeProduit',
  otherKey: 'idproduit',
  foreignKey: 'idcommande'
})
db.commandeproduits.belongsToMany(db.produits, {
  through: 'commandeProduit',
  as: 'produits',
  foreignKey: 'id',
  otherKey: 'idproduit',
  unique : false
});

// join tbl pack produit


db.packs.belongsToMany(db.produits,{
  through: 'packproduit',
  foreignKey: 'idpack',
  otherKey: 'id_produit',
})

db.produits.belongsToMany(db.packs,{
  through: 'packproduit',
  foreignKey: 'id_produit',
  otherKey: 'idpack'
})
db.packsproduits.belongsToMany(db.produits, {
  through: 'packproduit',
  as: 'produits_packs',
  foreignKey: 'id',
  otherKey: 'id_produit',
  unique : false
});

// join tbl user & task 
db.task.belongsToMany(db.users,{
  through: 'userTask',
  foreignKey: 'idTache',
  otherKey: 'idDelegue',
})
db.users.belongsToMany(db.task,{
  through: 'userTask',
  foreignKey: 'idDelegue',
  otherKey: 'idTache',
})
db.usertask.belongsToMany(db.users, {
  through: 'userTask',
  as: 'task_users',
  foreignKey: 'id',
  otherKey: 'idDelegue',
  unique : false
});
db.usertask.belongsToMany(db.task, {
  through: 'userTask',
  as: 'ut_tasks',
  foreignKey: 'id',
  otherKey: 'idTache',
  unique : false
});
module.exports = db;