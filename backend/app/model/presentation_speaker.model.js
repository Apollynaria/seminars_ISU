module.exports = (sequelize, Sequelize) => {
    var PresentationSpeaker = sequelize.define(
        'presentation_speaker',
        {
            presentation_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            speaker_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });
    PresentationSpeaker.associate = (models) =>  {
        PresentationSpeaker.belongsTo(models.presentation, {
            foreignKey: 'presentation_id'
        });
        PresentationSpeaker.belongsTo(models.speaker, {
            foreignKey: 'speaker_id'
        });
    };
    return PresentationSpeaker;
};