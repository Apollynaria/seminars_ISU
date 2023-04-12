module.exports = (sequelize, Sequelize) => {
    var Theme = sequelize.define(
        'theme', 
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });
    Theme.associate = (models) => {
        Theme.hasMany(models.presentation_theme, {
            foreignKey: 'theme_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Theme;
};