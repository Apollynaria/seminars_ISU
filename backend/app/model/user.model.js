module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', 
        {
            id: {
                type: Sequelize.INTEGER(10), 
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false 
            },
            login: {
                type: Sequelize.STRING(50),  
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            }
        });
    return User;
};