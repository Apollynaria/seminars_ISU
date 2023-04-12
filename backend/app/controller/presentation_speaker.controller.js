var db = require('../config/db.config.js');
var Presentation = db.presentation;
var Speaker = db.speaker;
var PresentationSpeaker = db.presentation_speaker;
var globalFunctions = require('../config/global.functions.js');

exports.findSpeakersForPresentation = (req, res) => {
    PresentationSpeaker.findAll({
        include: [
            {
                model: Presentation,
                required: true, 
                where: {
                    id: req.params.presentation_id
                }
            },
            {
                model: Speaker,
                required: true,
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findPresentationsForSpeaker = (req, res) => {
    PresentationSpeaker.findAll({
        include: [
            {
                model: Speaker,
                required: true, 
                where: {
                    id: req.params.speaker_id
                }
            },
            {
                model: Presentation,
                required: true, 
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.createSpeakers = (req, res) => {
    var speakers = req.body.speakers;
    var data = [];
    for (var i = 0; i < speakers.length; i++) {
        data.push(speakers[i]);
        data.push(req.body.presentation_id);
    }

    var placeholders = speakers.map(() => '(?,?)').join(',');
    db.sequelize.query(
        `INSERT INTO presentation_speaker(speaker_id, presentation_id) VALUES ` + placeholders,
        {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: data 
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.deleteSpeakerForPresentation = (req, res) => {
    PresentationSpeaker.destroy({
        where: {
            presentation_id: req.params.presentation_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};