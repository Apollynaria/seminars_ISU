module.exports = (sequelize, Sequelize) => {
    var PresentationTheme = sequelize.define(
        'presentation_theme',
        {
            presentation_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            theme_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    PresentationTheme.associate = (models) =>  {
        PresentationTheme.belongsTo(models.presentation, {
            foreignKey: 'presentation_id'
        });
        PresentationTheme.belongsTo(models.theme, {
            foreignKey: 'theme_id'
        });
    };
    return PresentationTheme;
};