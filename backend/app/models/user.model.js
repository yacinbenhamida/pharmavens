module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        date_naissance : {
            type: Sequelize.DATEONLY,
            defaultValue : null
        },
        cin : {
            type: Sequelize.STRING,  
        },
        adresse : {
            type: Sequelize.STRING
        },
        adresse_actuelle : {
            type: Sequelize.STRING
        },
        banque : {
            type: Sequelize.STRING
        },
        rib_bancaire : {
            type: Sequelize.STRING
        },
        diplome : {
            type: Sequelize.STRING
        },
        matricule_cnss : {
            type: Sequelize.STRING
        },
        vehicule_societe:{
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        
        imageUrl : {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING
        },
        emailPerso : {
            type: Sequelize.STRING
        },
        telephone : {
            type: Sequelize.STRING
        },
        telephone_perso : {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        sexe : {
            type: Sequelize.ENUM,
            values: ['homme', 'femme']
        },
        role: {
            type: Sequelize.ENUM,
            values: ['admin', 'superviseur', 'delege']
        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue : null
        },
        status: {
            type: Sequelize.ENUM('active', 'offline'),
            defaultValue: 'active'
        },
        about: {
            type: Sequelize.TEXT,
            defaultValue : null
        },
        type_contrat: {
            type: Sequelize.ENUM('CDI', 'CDD', 'SIVP', 'autres'),
            defaultValue: 'autres'
        },
        salaire : {
            type: Sequelize.INTEGER
        },
        frais : {
            type: Sequelize.INTEGER
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return User;
};