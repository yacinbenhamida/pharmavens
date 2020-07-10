module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        titre : {
            type : Sequelize.STRING
        },
        contenu : {
            type : Sequelize.TEXT
        },
        taskId : {
            type : Sequelize.INTEGER
        },
        senderId : {
            type : Sequelize.INTEGER
        },
        recieverId : {
            type : Sequelize.INTEGER
        },
        seen : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
    });
    return Notification;
};