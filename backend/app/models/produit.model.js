module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produit", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        description :{
            type: Sequelize.TEXT
        },
        image_url : {
            type: Sequelize.TEXT
        },
        prix : {
            type: Sequelize.DOUBLE
        },
        nb_gellules : {
            type: Sequelize.INTEGER
        },
        guide_gamme: {
            type: Sequelize.TEXT
        },
        fiche_poso : {
            type : Sequelize.TEXT
        },
        composition : {
            type : Sequelize.TEXT
        },
        etude_cliniques : {
            type : Sequelize.TEXT
        },
        times_sold : {
            type: Sequelize.INTEGER,
            defaultValue : 0
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Produit;
};