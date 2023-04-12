var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Presentation = db.presentation;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
var { Op } = require("sequelize");

var moment = require('moment');

var mime_expansion = new Map();
    mime_expansion
        .set("vnd.ms-powerpoint","ppt")
        .set("vnd.openxmlformats-officedocument.presentationml.presentation","pptx")
        .set("x-zip-compressed","zip")
        .set("zip","zip")
        .set("pdf","pdf")
        .set("png","png")
        .set("jpeg","jpeg")
        .set("x-zip","zip");

exports.findAll = (req, res) => {
    Presentation.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.time = (req, res) => {
    db.sequelize.query(
        `SELECT NOW() as dateServ`,
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

exports.findAllSorted = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM presentation
        ORDER BY presentation.date DESC`,
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

exports.create = async (req, res) =>{
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            var mimeType, link;
            if (fields.fileIsUpload[0] == 1) {
                var mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png

                var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
    
                expansion = mime_expansion.get(expansion);
                var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
                link = './files/' + newName;
    
                fs.rename(files.file[0].path, link, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                link = "";
                mimeType = "";
            }

            Presentation.create({
                name: fields.name[0],
                file: link,
                mime_type: mimeType,
                description: fields.description[0],        
                date: fields.date[0],
                place: fields.place[0]
            }).then(object => {
                globalFunctions.sendResult(res,object);
            }).catch(err =>{
                globalFunctions.sendError(res,err);
            })
        } else {
            globalFunctions.sendError(res, err);
        }
    });
};

exports.update = async (req, res) => {
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            var mimeType, link;
            if (fields.fileIsUpload[0] == 1){
                await Presentation.findByPk(fields.id[0])
                    .then(object => {
                        if (object.file) {
                            fs.unlinkSync(object.file);
                        }
                    })
                    .catch(err => {
                        globalFunctions.sendError(res, err);
                    })
                mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png
                // console.log(files.file[0]);

                var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
                expansion = mime_expansion.get(expansion);
                
                var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
                link = './files/' + newName;
    
                fs.rename(files.file[0].path, link, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                mimeType = fields.mime_type[0];
                link = fields.trueFile[0];
            }
                Presentation.update({
                    name: fields.name[0],
                    file: link,
                    mime_type: mimeType,
                    description: fields.description[0],        
                    date: fields.date[0],
                    place: fields.place[0]
                },
                {
                    where: {
                        id: fields.id[0]
                    }
                }
            ).then(object => {
                console.log(1);
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                console.log(2);
               //globalFunctions.sendError(res, err);
            })
        } else {
            globalFunctions.sendError(res, err);
        }
    });
};

exports.delete = (req, res) => {
    Presentation.findByPk(req.params.id)
    .then(async (object) => {
        // удаляем файл
        if (object.file){
            await fs.unlinkSync(object.dataValues.file);
        }
        await Presentation.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            globalFunctions.sendResult(res, 'Запись удалена');
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });

};

exports.getPresentationSortByData = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM presentation 
        WHERE presentation.date > NOW() 
        ORDER BY presentation.date 
        LIMIT 1 `,
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

exports.findByName = (req, res) => {
    Presentation.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
exports.findByDate = (req, res) => {
    moment.createFromInputFallback = function(config) {
        config._d = new Date(config._i);
    };
    var startDate = moment(req.params.date).startOf("day").toDate();
    var endDate = moment(req.params.date).endOf("day").toDate();
    Presentation.findAll({
        where: {
            date: {
                [Op.between]: [startDate, endDate]
            }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
exports.findById = (req, res) => {
    Presentation.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};