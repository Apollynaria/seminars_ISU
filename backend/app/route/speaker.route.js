module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const speaker = require('../controller/speaker.controller');
    
    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/speakers', speaker.findAll);
    app.post('/api/addSpeaker', [authJwt.verifyToken], speaker.create);
    app.post('/api/updateSpeaker/:id', [authJwt.verifyToken], speaker.update);
    app.post('/api/deleteSpeaker/:id', [authJwt.verifyToken], speaker.delete);
    app.get('/api/speaker/:id', speaker.findById);
    app.get('/api/speaker/name/:name', speaker.findByName);
};