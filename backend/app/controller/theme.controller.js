var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Theme = db.theme;
var { Op } = require("sequelize");
exports.findAll = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM theme
        ORDER BY theme.name`,
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
    Theme.create({
        name:req.body.name
    }).then(object => {
        globalFunctions.sendResult(res,object);
    }).catch(err =>{
        globalFunctions.sendError(res,err);
    })
};

exports.update = (req, res) => {
    Theme.update({
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

exports.delete = (req, res) => {
    Theme.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findByName = (req, res) => {
    Theme.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findById = (req, res) => {
    Theme.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};