module.exports = (sequelize, Sequelize) => {
    const Disponibilite = sequelize.define("disponibilite", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        intitule : {
            type : Sequelize.STRING
        },
        remarques : {
            type : Sequelize.TEXT
        },
        date_debut : {
            type : Sequelize.DATEONLY
        },
        date_fin : {
            type : Sequelize.DATEONLY
        },
        user_id : {
            type: Sequelize.INTEGER,
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Disponibilite;
};