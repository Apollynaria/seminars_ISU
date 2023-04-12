const { tg_user } = require('../config/db.config.js');
var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var TgUser = db.tg_user;

exports.findAll = (req, res) => {
    TgUser.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req,res) =>{
    TgUser.create({
        tg_id:req.body.tg_id
    }).then(object => {
        globalFunctions.sendResult(res,object);
    }).catch(err =>{
        globalFunctions.sendError(res,err);
    })
};

exports.update = (req, res) => {
    TgUser.update({
            name: req.body.tg_id
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
    TgUser.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
exports.findByTgId = (req, res) => {
    TgUser.findAll({
        where: {
            tg_id: req.params.tg_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


exports.findById = (req, res) => {
    TgUser.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};