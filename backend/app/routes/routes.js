var users = require("../controllers/user.controller.js");
var passport = require("passport");
var auth = require("../controllers/auth.controller")
var cars = require("../controllers/vehicule.controller")
var products = require("../controllers/produit.controller")
var clients = require('../controllers/client.controller')
var commande = require('../controllers/commande.controller')
var packs = require('../controllers/pack.controller')
var veilles = require('../controllers/veille.controller')
var tasks = require('../controllers/task.controller')
var comments = require('../controllers/comment.controller')
var notifs = require('../controllers/notifications.controller')
var reunions = require('../controllers/reunions.controller')
var contacts = require('../controllers/contact.controller')
var evaluation = require('../controllers/eval.controller')
var rapports = require('../controllers/rapport.controller')
var stats = require('../controllers/stat.controller');
var prospets = require('../controllers/prospet.controller');


module.exports = app => {
  app.get('/', auth.index);
  app.post('/login', auth.login);
  app.get('/users',users.getData);
  app.use('/logout', passport.authenticate('jwt', {
    session: false
  })).post('/logout', auth.logout);
  app.use('/register', passport.authenticate('jwt', {
    session: false
  })).post('/register', auth.register);
  app.use('/update-pw', passport.authenticate('jwt', {
    session: false
  })).post('/update-pw', auth.updateUserPassword);
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
  app.use('/getVeillesOfProduct', passport.authenticate('jwt', {
    session: false
  })).post('/getVeillesOfProduct', veilles.getVeillesOfProduct);
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
  app.use('/setTaskToprivate', passport.authenticate('jwt', {
    session: false
  })).post('/setTaskToprivate', tasks.setTaskToPrivate);
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
  })).post('/addEval', evaluation.addEvaluation);
  app.use('/getAllEvals', passport.authenticate('jwt', {
    session: false
  })).get('/getAllEvals', evaluation.getAll);
  app.use('/getEvalsOfdeleg', passport.authenticate('jwt', {
    session: false
  })).post('/getEvalsOfdeleg', evaluation.getEvalsOfdeleg);
  app.use('/deleteEval', passport.authenticate('jwt', {
    session: false
  })).post('/deleteEval', evaluation.delete);
  app.use('/editEval', passport.authenticate('jwt', {
    session: false
  })).post('/editEval', evaluation.edit);

  // rapports
  app.use('/addRapport', passport.authenticate('jwt', {
    session: false
  })).post('/addRapport', rapports.addRapport);
  app.use('/deleteRapport', passport.authenticate('jwt', {
    session: false
  })).post('/deleteRapport', rapports.delete);
  app.use('/editRapport', passport.authenticate('jwt', {
    session: false
  })).post('/editRapport', rapports.edit);
  app.use('/getAllRapports', passport.authenticate('jwt', {
    session: false
  })).get('/getAllRapports', rapports.getAll);
  app.use('/getRDOfrapport', passport.authenticate('jwt', {
    session: false
  })).post('/getRDOfrapport', rapports.getRDOfReport);

  //stats 
  app.use('/getStats', passport.authenticate('jwt', {
    session: false
  })).get('/getStats', stats.getStats);
 // planning
  app.use('/getPlannings/:iduser', passport.authenticate('jwt', {
    session: false
  })).get('/getPlannings/:iduser', tasks.getPlannings);
  app.use('/getPlanningsOfUser/:iduser', passport.authenticate('jwt', {
    session: false
  })).get('/getPlanningsOfUser/:iduser', tasks.getPlanningsOfUser);
  app.use('/getUserPlanning', passport.authenticate('jwt', {
    session: false
  })).get('/getUserPlanning', tasks.getDisponibilitesForSimpleUser);
  app.use('/getAdminPlanning', passport.authenticate('jwt', {
    session: false
  })).get('/getAdminPlanning', tasks.getDisponibilitesForAdmin);
  
  app.use('/addPlanning', passport.authenticate('jwt', {
    session: false
  })).post('/addPlanning', tasks.addPlanning);
  app.use('/deletePlanning', passport.authenticate('jwt', {
    session: false
  })).post('/deletePlanning', tasks.deletePlanning);
  app.use('/updatePlanning', passport.authenticate('jwt', {
    session: false
  })).post('/updatePlanning', tasks.editPlanning);

  app.use('/getAllProspets', passport.authenticate('jwt', {
    session: false
  })).get('/getAllProspets', prospets.getAllProspet);
  app.use('/getAllProspetsOfUser', passport.authenticate('jwt', {
    session: false
  })).post('/getAllProspetsOfUser', prospets.getAllProspetOfUser);
  app.use('/addProspet', passport.authenticate('jwt', {
    session: false
  })).post('/addProspet', prospets.addProspet);
  app.use('/deleteProspet', passport.authenticate('jwt', {
    session: false
  })).post('/deleteProspet', prospets.deleteProspet);
  app.use('/updateProspet', passport.authenticate('jwt', {
    session: false
  })).post('/updateProspet', prospets.editProspet);

};