module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const presentation_theme = require('../controller/presentation_theme.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/ThemesForPresentation/presentationId=:presentation_id', presentation_theme.findThemesForPresentation);
    app.get('/api/PresentationsForTheme/themeId=:theme_id', presentation_theme.findPresentationsForTheme);
    app.post('/api/addThemes', [authJwt.verifyToken], presentation_theme.createThemes);
    app.post('/api/deleteThemeForPresentation/presentationId=:presentation_id', [authJwt.verifyToken], presentation_theme.deleteThemeForPresentation);
};