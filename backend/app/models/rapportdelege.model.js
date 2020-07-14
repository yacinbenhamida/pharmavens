module.exports = (sequelize, Sequelize) => {
    const RapportDelegue = sequelize.define("rapport_delegue", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        idRapport : {
            type: Sequelize.INTEGER,
        },
        idDelegue : {
            type: Sequelize.INTEGER,
        },
        manifestation : {
            type: Sequelize.ENUM,
            values: ['STAFF', 'FORMATION', 'EPU' , 'CONGRES','AUCUNE'],
            default : null
        },
        conges : {
            type : Sequelize.BOOLEAN
        },
        nb_jours_conges : {
            type: Sequelize.INTEGER,
        },
        realise_obj_1 : { // obj1 = specialité , pharmacie etc
            type: Sequelize.INTEGER,
        },
        realise_obj_2 : {
            type: Sequelize.INTEGER,
        },
        total_realise : {
            type: Sequelize.INTEGER,
        },
        pharma_gro_realisees : { // pharmacies ou grossistes realisees ou cachets
            type: Sequelize.INTEGER,
        },
        realise_ventes : {
            type: Sequelize.INTEGER,
        },
        // qualite rapport
        rapport_envoye : {
            type: Sequelize.BOOLEAN,
        },
        respect_plan_tournee : {
            type: Sequelize.BOOLEAN,
        },
        visite_detail : {
            type: Sequelize.BOOLEAN,
        },
        promesse_packs : {
            type: Sequelize.BOOLEAN,
        },
        respect_plan_charge : {
            type: Sequelize.BOOLEAN,
        },
        remarques_pertinentes : {
            type: Sequelize.BOOLEAN
        },
        veille_c : {
            type: Sequelize.BOOLEAN,
        },
        capture_ecran : {
            type: Sequelize.BOOLEAN,
        },
        pourcentage_satisfaction : {
            type: Sequelize.INTEGER,
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE , default : Date.now()}
    });
    return RapportDelegue;
};