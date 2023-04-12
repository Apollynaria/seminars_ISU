var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Speaker = db.speaker;
var { Op } = require("sequelize");
exports.findAll = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM speaker
        ORDER BY speaker.name`,
        {
            type: db.sequelize.QueryTypes.SELECT,
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req,res) =>{
    Speaker.create({
        name:req.body.name
    }).then(object => {
        globalFunctions.sendResult(res,object);
    }).catch(err =>{
        globalFunctions.sendError(res,err);
    })
};

exports.update = (req, res) => {
    Speaker.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
exports.findByName = (req, res) => {
    Speaker.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    Speaker.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Speaker.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};