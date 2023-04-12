module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const tg_user = require('../controller/tg_user.controller');
    
    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/TgUsers', [authJwt.verifyToken], tg_user.findAll);
    app.post('/api/addTgUser',[authJwt.verifyToken], tg_user.create);
    app.post('/api/updateTgUser/:id', [authJwt.verifyToken], tg_user.update);
    app.post('/api/deleteTgUser/:id', [authJwt.verifyToken], tg_user.delete);
    app.get('/api/TgUser/:id', [authJwt.verifyToken], tg_user.findById);
    app.get('/api/TgUser/tg_id/:tg_id', [authJwt.verifyToken], tg_user.findByTgId);
};