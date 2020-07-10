const User = require("../models").users;


exports.loggedOn = (req, res , next) => {
      User.findOne({
        where: {
          email: req.query.email,
        },
      }).then(user => {
        if(user) {
        res.status(200).send({
          auth: true,
          id : user.id,
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          role : user.role,
          status : user.status,
          imageUrl : user.imageUrl,
          about : user.about
        });
      }
      else res.sendStatus(401)
      })
};
exports.findAll = (req,res) => {
  User.findAll({
    attributes: {exclude: ['password']}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}
exports.findAllDeleges = (req,res) => {
  User.findAll({ where :{
    role : 'delege'
  },
    attributes: {exclude: ['password']}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}


exports.deleteUser = (req,res) =>{
  if(req.body.id){
    User.destroy({
      where : {
        id : req.body.id
      }
    }).then(res => {
      res.sendStatus(200)
    }).catch(err => {
      res.status(404).send({
        message:
          err.message || "Some error occurred while deleting user."
      });
    });
  }
  else res.sendStatus(500)
}
