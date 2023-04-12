var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); 

app.use(express.static("files"));
db.sequelize.sync({force: false});

app.listen(3000);

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

var auth = require('./app/route/auth.route.js');
auth(app);

var user=require('./app/route/user.route.js');
user(app);

var theme=require('./app/route/theme.route.js');
theme(app);

var speaker=require('./app/route/speaker.route.js');
speaker(app);

var tg_user=require('./app/route/tg_user.route.js');
tg_user(app);

var presentation=require('./app/route/presentation.route.js');
presentation(app);

var presentation_theme=require('./app/route/presentation_theme.route.js');
presentation_theme(app);

var presentation_speaker=require('./app/route/presentation_speaker.route.js');
presentation_speaker(app);