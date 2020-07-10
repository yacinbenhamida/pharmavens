module.exports = (sequelize, Sequelize) => {
    const Reunion = sequelize.define("reunions", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        objet : {
            type : Sequelize.STRING
        },
        membres : {
            type : Sequelize.TEXT
        },
        volet_medical : {
            type : Sequelize.TEXT
        },
        volet_commercial : {
            type : Sequelize.TEXT
        },
        conclusion_generale : {
            type : Sequelize.TEXT
        },
        added_by : {
            type : Sequelize.STRING
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
    });
    return Reunion;
};