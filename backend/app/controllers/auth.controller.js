const database = require('../models')
const User = database.users
const Vehicule = database.vehicules
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/passport/jwtConfig')
const bCrypt = require('bcrypt')
const dateformat = require('dateformat')
const isValidPassword = function(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}
const generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

exports.register = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.user.email,
      },
    }).then(user => {
      if (!user) {
        User
          .create({
            prenom: req.body.user.prenom,
            nom: req.body.user.nom,
            email: req.body.user.email,
            cin: req.body.user.cin,
            adresse: req.body.user.adresse,
            adresse_actuelle : req.body.user.adresse_actuelle,
            banque : req.body.user.banque,
            rib_bancaire :req.body.user.rib_bancaire,
            diplome : req.body.user.diplome,
            matricule_cnss : req.body.user.matricule_cnss,
            vehicule_societe:req.body.user.vehicule_societe,
            password: generateHash(req.body.user.password),
            isActivated: req.body.user.isActivated,
            about : req.body.user.about,
            sexe : req.body.user.sexe,
            role: req.body.user.role,
            date_naissance : req.body.user.date_naissance,
            imageUrl : req.body.user.imageUrl,
            emailPerso : req.body.user.emailPerso,
            telephone : req.body.user.telephone,
            telephone_perso : req.body.user.telephone_perso,
            type_contrat : req.body.user.type_contrat,
            salaire : req.body.user.salaire,
            frais : req.body.user.frais,
            createdAt : Date(),
            status : 'offline'
          })
          .then((result) => {
            console.log(result)
            if(result && req.body.vehicule){
              let car = req.body.vehicule
              Vehicule.create(
              car
              ,{w:1},{returning : true}).then(v => {
                v.setUser(result)
                v.save()
              })
            }
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
      }
      else res.sendStatus(403) // already registered
    });
}

exports.login = (req, res, next) => {
    console.log('here')
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user && isValidPassword(user.password, req.body.password) && user.isActivated) {
        user.status = 'active'
        user.last_login = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
        user.save()
        const token = jwt.sign({ id: user.email }, jwtSecret.secret);
        res.status(200).send({
          auth: true,
          token: token,
          role : user.role,
          message: 'user found & logged in',
        });
      }
      else res.sendStatus(404)
    });
}
exports.logout = (req,res) =>{
  if(req.body.email){
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
        user.status = 'offline'
        user.save()
        req.logout();
        res.send({message : 'out'})
    })
  }

}
exports.editUser = (req,res) => {
  User.findOne({
    where: {
      id: req.body.user.id,
    }, include : ['vehicule']}).then(user => {
    if (user) {
      User
        .update({
          prenom: req.body.user.prenom,
          nom: req.body.user.nom,
          email: req.body.user.email,
          cin: req.body.user.cin,
          adresse: req.body.user.adresse,
          adresse_actuelle : req.body.user.adresse_actuelle,
          banque : req.body.user.banque,
          rib_bancaire :req.body.user.rib_bancaire,
          diplome : req.body.user.diplome,
          matricule_cnss : req.body.user.matricule_cnss,
          password: req.body.user.password?generateHash(req.body.user.password) : user.password,
          isActivated: req.body.user.isActivated,
          about : req.body.user.about,
          sexe : req.body.user.sexe,
          role: req.body.user.role,
          date_naissance : req.body.user.date_naissance,
          imageUrl : req.body.user.imageUrl,
          emailPerso : req.body.user.emailPerso,
          telephone : req.body.user.telephone,
          telephone_perso : req.body.user.telephone_perso,
          type_contrat : req.body.user.type_contrat,
          salaire : req.body.user.salaire,
          frais : req.body.user.frais,
          vehicule_societe: req.body.user.vehicule_societe,
          updatedAt : Date(),
        },{ where : {id : user.id}})
        .then((result) => {
          let car = req.body.user.vehicule
          if (result && !result.vehicule && car){
            Vehicule.create(
              car
              ,{w:1},{returning : true}).then(v => {
                v.setUser(user)
                v.save()
              })    
          }
          else if(result && car && result.vehicule){
            Vehicule.update({
              modele: car.modele,
              immatriculation : car.immatriculation,
              carte_grise:  car.carte_grise,
              date_echeance_assurance : car.date_echeance_assurance,
              numero_carte_essence : car.numero_carte_essence,
              code_carte_essence : car.code_carte_essence,
              date_derniere_vidange : car.date_derniere_vidange ,
              date_vignette : car.date_vignette,
              kilometrage : car.kilometrage,
              amortissement_vehicule : car.amortissement_vehicule
            },{ where : {userId : user.id}}).then(v => {
              console.log('user car updated in db');
            })          
          } 
          console.log('user updated in db');
          res.status(200).send({ message: 'user updated' });
        });
    }
    else res.sendStatus(403) // already registered
  });
}
exports.updateUserPassword = (req,res)=>{
    const newpw = req.body.password
    const userid = req.body.email
    if(userid && newpw){
      User.findOne({where : {email : userid}}).then(user=>{
        if(user){
          user.password = generateHash(newpw)
          user.save()
          return res.send({message : 'password updated'})
        }else return res.status(404).send({message : 'user not found'})
      })
    }
}
exports.index =(req,res)=>{
  var message = 'It works!\n',
      version = 'NodeJS ' + process.versions.node + '\n',
      response = [message, version].join('\n');
  res.send(response);
}

