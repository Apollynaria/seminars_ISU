var db = require('../config/db.config.js');
var Presentation = db.presentation;
var Theme = db.theme;
var PresentationTheme = db.presentation_theme;
var globalFunctions = require('../config/global.functions.js');

exports.findThemesForPresentation = (req, res) => {
    PresentationTheme.findAll({
        include: [
            {
                model: Presentation,
                required: true, 
                where: {
                    id: req.params.presentation_id
                }
            },
            {
                model: Theme,
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

exports.findPresentationsForTheme = (req, res) => {
    PresentationTheme.findAll({
        include: [
            {
                model: Theme,
                required: true, 
                where: {
                    id: req.params.theme_id
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

exports.createThemes = (req, res) => {
    var themes = req.body.themes;
    var data = [];
    for (var i = 0; i < themes.length; i++) {
        data.push(themes[i]);
        data.push(req.body.presentation_id);
    }

    var placeholders = themes.map(() => '(?,?)').join(',');
    db.sequelize.query(
        `INSERT INTO presentation_theme(theme_id, presentation_id) VALUES ` + placeholders,
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

exports.deleteThemeForPresentation = (req, res) => {
    PresentationTheme.destroy({
        where: {
            presentation_id: req.params.presentation_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};