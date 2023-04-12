var dbProperties = {
    database: 'seminar',
    username: 'root',
    password:'',
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 3000,
        idle:1000
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        },
        dialectOptions: {
            useUTC: false,
            timezone: "+08:00"
        },
        timezone: "+08:00"
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.theme = require('../model/theme.model.js')(sequelize, Sequelize);
db.speaker = require('../model/speaker.model.js')(sequelize, Sequelize);
db.tg_user = require('../model/tg_user.model.js')(sequelize, Sequelize);
db.presentation = require('../model/presentation.model.js')(sequelize, Sequelize);
db.presentation_speaker = require('../model/presentation_speaker.model.js')(sequelize, Sequelize);
db.presentation_theme = require('../model/presentation_theme.model.js')(sequelize, Sequelize);


// Связывание моделей без импорта файлов (то есть, чтобы в файле описания любой модели можно было
// обращаться к другим моделям по имени без необходимости импорта в виде require(...))
Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});
module.exports = db;