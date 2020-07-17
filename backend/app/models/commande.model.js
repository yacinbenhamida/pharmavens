module.exports = (sequelize, Sequelize) => {
    const Commande = sequelize.define("commande", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        prix_total : {
            type : Sequelize.DOUBLE
        },
        selectedPackId : {
            type : Sequelize.INTEGER
        },
        // si la commande est passée depuis un grossiste intermediaire
        grossiteIntermediareId : {
            type : Sequelize.INTEGER
        },
        total_remise : {
            type : Sequelize.DOUBLE
        },
        type : {
            type: Sequelize.ENUM,
            values: ['direct', 'grossiste']
        },
        nb_produits : {
            type : Sequelize.DOUBLE
        },
        createdAt: {type : Sequelize.DATEONLY , default : Date.now()},
        updatedAt: {type : Sequelize.DATEONLY, default : null},
    });
    return Commande;
};