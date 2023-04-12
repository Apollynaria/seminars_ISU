module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    const presentation_speaker = require('../controller/presentation_speaker.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/SpeakersForPresentation/presentationId=:presentation_id', presentation_speaker.findSpeakersForPresentation);
    app.get('/api/PresentationsForSpeaker/speakerId=:speaker_id', presentation_speaker.findPresentationsForSpeaker);
    app.post('/api/addSpeakers', [authJwt.verifyToken], presentation_speaker.createSpeakers);
    app.post('/api/deleteSpeakerForPresentation/presentationId=:presentation_id', [authJwt.verifyToken], presentation_speaker.deleteSpeakerForPresentation);
};