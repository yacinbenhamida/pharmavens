module.exports = (sequelize, Sequelize) => {
    const Evaluation = sequelize.define("evaluation", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nom_sortie : {
            type : Sequelize.STRING
        },
        date_sortie : {
            type : Sequelize.DATEONLY
        },
        secteur : {
            type : Sequelize.STRING
        },
        note_globale : {
            type : Sequelize.DOUBLE
        },
        presentation : {
            type : Sequelize.DOUBLE
        },
        exp_orale : {
            type : Sequelize.DOUBLE
        },
        gestuelle : {
            type : Sequelize.DOUBLE
        },
        prop_voiture : {
            type : Sequelize.DOUBLE
        },
        conaissance_produit : {
            type : Sequelize.DOUBLE
        },
        conaissance_concurrence : {
            type : Sequelize.DOUBLE
        },
        etablir_securite : {
            type : Sequelize.DOUBLE
        },
        mise_en_place : {
            type : Sequelize.DOUBLE
        },
        nego_pack : {
            type : Sequelize.DOUBLE
        },
        ecoute : {
            type : Sequelize.DOUBLE
        },
        observation : {
            type : Sequelize.DOUBLE
        },
        questionnement : {
            type : Sequelize.DOUBLE
        },
        feedback_prescrip : {
            type : Sequelize.DOUBLE
        },
        traitement_objections : {
            type : Sequelize.DOUBLE
        },
        conclusion : {
            type : Sequelize.DOUBLE
        },
        utilisation_mp : {
            type : Sequelize.DOUBLE
        },
        plan_journee : {
            type : Sequelize.DOUBLE
        },
        ciblage : {
            type : Sequelize.DOUBLE
        },
        maitrise_clients : {
            type : Sequelize.DOUBLE
        },
        maitrise_terrain : {
            type : Sequelize.DOUBLE
        },
        administratif : {
            type : Sequelize.DOUBLE
        },
        objectifs : {
            type : Sequelize.TEXT
        },
        idDelegue :{
            type : Sequelize.INTEGER
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE , default : Date.now()}
    });
    return Evaluation;
};