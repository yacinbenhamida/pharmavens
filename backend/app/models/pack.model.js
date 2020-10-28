module.exports = (sequelize, Sequelize) => {
    const Pack = sequelize.define("pack", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nom_pack: {
            type: Sequelize.STRING
        },
        description :{
            type: Sequelize.TEXT
        },
        prix_total : {
            type : Sequelize.DOUBLE
        },
        type_pack : {
            type: Sequelize.ENUM,
            values: ['panache', 'normal']
        },
        pourcentage_unite_gratuites_grossiste: {
            type: Sequelize.INTEGER,
        },
        valeur_unite_gratuites_grossiste_ttc : {
            type: Sequelize.DOUBLE
        },
        pourcentage_unite_gratuites_vd : {
            type: Sequelize.INTEGER,
        },
        valeur_unite_gratuites_vd_ttc : {
            type: Sequelize.DOUBLE
        },
        valeur_bon_achat : {
            type: Sequelize.INTEGER,
        },
        remise_total_comptant : {
            type: Sequelize.INTEGER,
        },
        remise_total_dans_un_mois : {
            type: Sequelize.INTEGER,
        },
        times_sold : {
            type: Sequelize.INTEGER,
            defaultValue : 0
        },
        visible : {
            type: Sequelize.BOOLEAN,
            defaultValue : true
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Pack;
};