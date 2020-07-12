module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nom : {
            type : Sequelize.STRING
        },
        type : {
            type : Sequelize.STRING
        },
        activite : {
            type : Sequelize.STRING
        },
        numtel : {
            type : Sequelize.STRING
        },
        email : {
            type : Sequelize.STRING
        },
        addresse : {
            type : Sequelize.TEXT
        },
        added_by : {
            type : Sequelize.STRING
        },
        createdAt: {type : Sequelize.DATE , default : Date.now()},
        updatedAt: {type : Sequelize.DATE , default : Date.now()}
    });
    return Contact;
};