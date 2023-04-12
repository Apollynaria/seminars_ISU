module.exports = (sequelize, Sequelize) => {
    var Presentation = sequelize.define(
        'presentation', 
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            file:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
	    mime_type:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            description:{
                type:Sequelize.STRING(600),
                allowNull:true
            },
            date:{
                type:Sequelize.DATE,
                allowNull:false
            },
            place:{
                type:Sequelize.STRING(100),
                allowNull:true
            }
        });
    Presentation.associate = (models) => {
        Presentation.hasMany(models.presentation_theme, {
            foreignKey: 'presentation_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        Presentation.hasMany(models.presentation_speaker,{
            foreignKey:'presentation_id',
            onDelete:'CASCADE',
            onUpdate:'CASCADE',
            sourceKey:'id'
        });
    };
    return Presentation;
};