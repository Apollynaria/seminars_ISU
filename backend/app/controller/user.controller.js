var db = require('../config/db.config.js');
var config = require("../config/auth.config");
const globalFunctions = require('../config/global.functions.js');
var User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.findAll = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM user
        ORDER BY user.login`,
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
    User.create({
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(object => {
        globalFunctions.sendResult(res,object);
    }).catch(err =>{
        globalFunctions.sendError(res,err);
    })
};

exports.update = (req, res) => {
    User.update({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, 10)
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
    User.destroy({
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
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};