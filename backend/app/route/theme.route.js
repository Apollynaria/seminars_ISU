module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const theme = require('../controller/theme.controller');
    
    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/themes', theme.findAll);
    app.post('/api/addTheme', [authJwt.verifyToken], theme.create);
    app.post('/api/updateTheme/:id', [authJwt.verifyToken], theme.update);
    app.post('/api/deleteTheme/:id', [authJwt.verifyToken], theme.delete);
    app.get('/api/theme/:id', theme.findById);
    app.get('/api/theme/name/:name', theme.findByName);
};