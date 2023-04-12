module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const presentation = require('../controller/presentation.controller');
    
    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/time', presentation.time);
    app.get('/api/presentationsSorted', presentation.findAllSorted);
    app.get('/api/presentations', presentation.findAll);
    app.post('/api/addPresentation', [authJwt.verifyToken], presentation.create);
    app.post('/api/updatePresentation/:id', [authJwt.verifyToken], presentation.update);
    app.post('/api/deletePresentation/:id', [authJwt.verifyToken], presentation.delete);
    app.get('/api/presentation/:id', presentation.findById);
    app.get('/api/presentationsSortByData', presentation.getPresentationSortByData);
    app.get('/api/presentation/name/:name', presentation.findByName);
    app.get('/api/presentation/date/:date', presentation.findByDate);
};