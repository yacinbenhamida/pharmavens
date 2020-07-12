const users = require("../controllers/user.controller.js");
const passport = require("passport");
const auth = require("../controllers/auth.controller")
const cars = require("../controllers/vehicule.controller")
const products = require("../controllers/produit.controller")
const clients = require('../controllers/client.controller')
const commande = require('../controllers/commande.controller')
const packs = require('../controllers/pack.controller')
const veilles = require('../controllers/veille.controller')
const tasks = require('../controllers/task.controller')
const comments = require('../controllers/comment.controller')
const notifs = require('../controllers/notifications.controller')
const reunions = require('../controllers/reunions.controller')
const contacts = require('../controllers/contact.controller')
const eval = require('../controllers/eval.controller')
module.exports = app => {
  app.post('/login', auth.login);
  app.use('/logout', passport.authenticate('jwt', {
    session: false
  })).post('/logout', auth.logout);
  app.use('/register', passport.authenticate('jwt', {
    session: false
  })).post('/register', auth.register);
  app.use('/connected', passport.authenticate('jwt', {
    session: false
  })).get('/connected', users.loggedOn);
  app.use('/allUsers', passport.authenticate('jwt', {
    session: false
  })).get('/allUsers', users.findAll);
  app.use('/allDeleges', passport.authenticate('jwt', {
    session: false
  })).get('/allDeleges', users.findAllDeleges);
  app.use('/deleteUser', passport.authenticate('jwt', {
    session: false
  })).post('/deleteUser', users.deleteUser);
  app.use('/getUserCars', passport.authenticate('jwt', {
    session: false
  })).post('/getUserCars', cars.getVehicleOfUser);
  app.use('/updateUser', passport.authenticate('jwt', {
    session: false
  })).post('/updateUser', auth.editUser);
  // products 
  app.use('/addProduct', passport.authenticate('jwt', {
    session: false
  })).post('/addProduct', products.addProduct);
  app.use('/editProduct', passport.authenticate('jwt', {
    session: false
  })).post('/editProduct', products.editProduct);
  app.use('/allProducts', passport.authenticate('jwt', {
    session: false
  })).get('/allProducts', products.getAllProducts);
  app.use('/deleteProduct', passport.authenticate('jwt', {
    session: false
  })).post('/deleteProduct', products.deleteProduct);
  app.use('/allClients', passport.authenticate('jwt', {
    session: false
  })).get('/allClients', clients.getAllClients);
  app.use('/addClient', passport.authenticate('jwt', {
    session: false
  })).post('/addClient', clients.addClient);
  app.use('/editClient', passport.authenticate('jwt', {
    session: false
  })).post('/editClient', clients.editClient);
  app.use('/deleteClient', passport.authenticate('jwt', {
    session: false
  })).post('/deleteClient', clients.deleteClient);
  app.use('/addCommande', passport.authenticate('jwt', {
    session: false
  })).post('/addCommande', commande.addCommande);
  app.use('/getAllCommandes', passport.authenticate('jwt', {
    session: false
  })).get('/getAllCommandes', commande.getAllCommandes);
  app.use('/getCommandesProducts', passport.authenticate('jwt', {
    session: false
  })).post('/getCommandesProducts', commande.getProduitsOfCommande);
  app.use('/deleteCommande', passport.authenticate('jwt', {
    session: false
  })).post('/deleteCommande', commande.deleteCommande);
  app.use('/addPack', passport.authenticate('jwt', {
    session: false
  })).post('/addPack', packs.addPack);
  app.use('/getPacks', passport.authenticate('jwt', {
    session: false
  })).get('/getPacks', packs.getAllPacks);
  app.use('/getProdPacks', passport.authenticate('jwt', {
    session: false
  })).post('/getProdPacks', packs.getProductsOfPack);
  app.use('/incrementPackSold', passport.authenticate('jwt', {
    session: false
  })).post('/incrementPackSold', packs.incrmentPackSold);
  app.use('/deletePack', passport.authenticate('jwt', {
    session: false
  })).post('/deletePack', packs.deletePack);
  app.use('/addVeille', passport.authenticate('jwt', {
    session: false
  })).post('/addVeille', veilles.addVeille);
  app.use('/getVeilles', passport.authenticate('jwt', {
    session: false
  })).get('/getVeilles', veilles.getAll);
  app.use('/deleteVeille', passport.authenticate('jwt', {
    session: false
  })).post('/deleteVeille', veilles.delete);
  // tasks
  app.use('/addTask', passport.authenticate('jwt', {
    session: false
  })).post('/addTask', tasks.addTask);
  app.use('/getAllTasks', passport.authenticate('jwt', {
    session: false
  })).get('/getAllTasks', tasks.getAllTasks);
  app.use('/getUTOfTask', passport.authenticate('jwt', {
    session: false
  })).post('/getUTOfTask', tasks.getUTofTask);
  app.use('/deleteTask', passport.authenticate('jwt', {
    session: false
  })).post('/deleteTask', tasks.deleteTask);
  app.use('/updateTaskstatus', passport.authenticate('jwt', {
    session: false
  })).post('/updateTaskstatus', tasks.updateTaskStatus);
  // comments
  app.use('/addComment', passport.authenticate('jwt', {
    session: false
  })).post('/addComment', comments.addComment);
  app.use('/deleteComment', passport.authenticate('jwt', {
    session: false
  })).post('/deleteComment', comments.deleteComment);
  app.use('/getCommentsOfTask', passport.authenticate('jwt', {
    session: false
  })).post('/getCommentsOfTask', comments.getCommentsOfTask);
  app.use('/getTask', passport.authenticate('jwt', {
    session: false
  })).post('/getTask', tasks.getTask);
  app.use('/getTasksOfUser', passport.authenticate('jwt', {
    session: false
  })).post('/getTasksOfUser', tasks.getTasksOFUser);
  // notifications
  app.use('/addNotif', passport.authenticate('jwt', {
    session: false
  })).post('/addNotif', notifs.addNotification);
  app.use('/getNotificationsOfUser', passport.authenticate('jwt', {
    session: false
  })).post('/getNotificationsOfUser', notifs.getNotificationsOfUser);
  app.use('/updateNotif', passport.authenticate('jwt', {
    session: false
  })).post('/updateNotif', notifs.setNotificationSeen);
  app.use('/deleteNotif', passport.authenticate('jwt', {
    session: false
  })).post('/deleteNotif', notifs.deleteNotif);
  // reunions
  app.use('/addReun', passport.authenticate('jwt', {
    session: false
  })).post('/addReun', reunions.addReunion);
  app.use('/getAllReun', passport.authenticate('jwt', {
    session: false
  })).get('/getAllReun', reunions.getAll);
  app.use('/deleteReun', passport.authenticate('jwt', {
    session: false
  })).post('/deleteReun', reunions.delete);
  app.use('/updateReun', passport.authenticate('jwt', {
    session: false
  })).post('/updateReun', reunions.edit);
  // contacts
  app.use('/addContact', passport.authenticate('jwt', {
    session: false
  })).post('/addContact', contacts.addContact);
  app.use('/getAllContacts', passport.authenticate('jwt', {
    session: false
  })).get('/getAllContacts', contacts.getAll);
  app.use('/deleteContact', passport.authenticate('jwt', {
    session: false
  })).post('/deleteContact', contacts.delete);
  app.use('/updateContact', passport.authenticate('jwt', {
    session: false
  })).post('/updateContact', contacts.edit);
  // evals
  app.use('/addEval', passport.authenticate('jwt', {
    session: false
  })).post('/addEval', eval.addEvaluation);
  app.use('/getAllEvals', passport.authenticate('jwt', {
    session: false
  })).get('/getAllEvals', eval.getAll);
  app.use('/getEvalsOfdeleg', passport.authenticate('jwt', {
    session: false
  })).post('/getEvalsOfdeleg', eval.getEvalsOfdeleg);
  app.use('/deleteEval', passport.authenticate('jwt', {
    session: false
  })).post('/deleteEval', eval.delete);
  app.use('/editEval', passport.authenticate('jwt', {
    session: false
  })).post('/editEval', eval.edit);
};