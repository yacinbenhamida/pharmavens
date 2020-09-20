module.exports = (sequelize, Sequelize) => {
    const Prospet = sequelize.define("prospet", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        type_prospet : {
            type: Sequelize.ENUM,
            values: ['pharmacie', 'medecin', 'autres']
        },
        nom_complet : {
            type : Sequelize.STRING
        },
        budget : {
            type: Sequelize.DOUBLE,
        },
        localite : {
            type : Sequelize.STRING
        },
        specialite : {
            type : Sequelize.STRING
        },
        potentiel : {
            type : Sequelize.STRING
        },
        produits : {
            type : Sequelize.TEXT
        },
        details : {
            type : Sequelize.TEXT
        },
        date_debut : {
            type : Sequelize.DATEONLY
        },
        duree : {
            type : Sequelize.STRING
        },
        nb_prescription_jour : {
            type: Sequelize.INTEGER,
        },
        date_demande : {
            type : Sequelize.DATEONLY 
        },
        accord_direction : {
            type: Sequelize.BOOLEAN,
            defautValue : false
        },
        accord_superviseur : {
            type: Sequelize.BOOLEAN,
            defautValue : false
        },
        id_delegue : {
            type: Sequelize.INTEGER,
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Prospet;
};