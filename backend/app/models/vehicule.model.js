module.exports = (sequelize, Sequelize) => {
    const Vehicule = sequelize.define("vehicule", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        modele: {
            type: Sequelize.STRING
        },
        immatriculation : {
            type: Sequelize.STRING
        },
        carte_grise: {
            type: Sequelize.STRING
        },
        date_echeance_assurance : {
            type : Sequelize.DATE
        },
        numero_carte_essence : {
            type : Sequelize.STRING
        },
        code_carte_essence : {
            type : Sequelize.STRING
        },
        date_derniere_vidange : {
            type : Sequelize.DATE
        },
        kilometrage : {
            type : Sequelize.INTEGER
        },
        userId : {
            type : Sequelize.INTEGER
        },
        amortissement_vehicule : {
            type: Sequelize.INTEGER,
            defaultValue : 0
        },  
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Vehicule;
};