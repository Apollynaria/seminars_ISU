module.exports = (sequelize, Sequelize) => {
    var Tg_user = sequelize.define(
        'tg_user', 
        {   
            id: {
                type: Sequelize.INTEGER(10), 
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false 
            },
            tg_id: {
                type: Sequelize.INTEGER(20), 
                allowNull: false 
            }
        });
    return Tg_user;
};