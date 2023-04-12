module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const user = require('../controller/user.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // app.get('/api/users', [authJwt.verifyToken], user.findAll);

    app.get('/api/users', [authJwt.verifyToken], user.findAll);
    app.post('/api/addUser', [verifySignUp.checkDuplicateUsername], [authJwt.verifyToken], user.create);
    app.post('/api/updateUser/:id', [authJwt.verifyToken], user.update);
    app.post('/api/deleteUser/:id', [authJwt.verifyToken], user.delete);
    app.get('/api/user/:id', [authJwt.verifyToken], user.findById);
};