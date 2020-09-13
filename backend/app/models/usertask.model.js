module.exports = (sequelize, Sequelize) => {
    const UserTask = sequelize.define("userTask", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        idDelegue : {
            type: Sequelize.INTEGER,
            unique : false
        },
        idTache : {
            type: Sequelize.INTEGER,
            unique : false
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
    });
    return UserTask;
};