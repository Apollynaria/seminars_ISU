module.exports = (sequelize, Sequelize) => {
    var Speaker = sequelize.define(
        'speaker', 
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

    Speaker.associate = (models) => {
        Speaker.hasMany(models.presentation_speaker, {
            foreignKey: 'speaker_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Speaker;
};