module.exports = (sequelize, Sequelize) => {
    const Rapport = sequelize.define("rapport", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        type_rapport : {
            type: Sequelize.ENUM,
            values: ['VP', 'VM', 'A'] // VM = V medecin, VP = V pharmacies, A = animatrices
        },
        semaine_rapport : {
            type: Sequelize.INTEGER
        },
        date_debut_rapport :{
            type : Sequelize.DATEONLY
        },
        date_fin_rapport :{
            type : Sequelize.DATEONLY
        },
        ownerId : {
            type: Sequelize.INTEGER,
        },
        remarques : {
            type: Sequelize.TEXT
        },
        objectif_1:{
            type: Sequelize.INTEGER,
        },
        objectif_2:{
            type: Sequelize.INTEGER,
        },
        objectif_total : {
            type: Sequelize.INTEGER,
        },
        objectif_pharmacies_grossiste:{ // peut etre pharma ou grossiste
            type: Sequelize.INTEGER,
        },
        objectif_vente_animatrice : {
            type: Sequelize.DOUBLE
        },
        jour_ferie : {
            type: Sequelize.BOOLEAN
        },
        reunion : {
            type: Sequelize.BOOLEAN
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE , default : Date.now()}
    });
    return Rapport;
};