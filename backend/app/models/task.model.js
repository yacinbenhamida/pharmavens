module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nom_tache : {
            type : Sequelize.STRING
        },
        contenu : {
            type : Sequelize.TEXT
        },
        date_rappel : {
            type : Sequelize.DATEONLY
        },
        date_echance : {
            type : Sequelize.DATEONLY
        },
        attached_file : {
            type : Sequelize.TEXT
        },
        private : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        isdone : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE, default : null},
    });
    return Task;
};