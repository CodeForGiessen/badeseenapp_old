'use strict';

var BadeseenDAO = require(__dirname + '/libs/badeseendao');

var basepath;
var badeseendao;


/**
 * [_handleLakeGet Handles get request of lake and returns all lakes]
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 * @return {[type]} [description]
 */
function handleLakesGet(req, res, next){
    badeseendao.getAllLakes()
    .then(function(lakes){
        res.json(lakes);
    })
    .catch(function(error){
        console.log(error);
        next(error);
    });
}

function handleLakeIdGet(req, res){
    var id = parseInt(req.param('id'));
    if(!isNaN(id)){
        badeseendao.getLakeById(id)
        .then(function(lake){
            res.json(lake);
        })
        .catch(function(){
            res.status(404).send('lake with ' + id + ' does not exist');
        });
    }else{
        res.sendStatus(400);
    }
}

function registerPaths(app){
    var lakespath = basepath + 'lakes';
    app.get(lakespath,handleLakesGet);

    var lakepath = basepath + 'lake/:id';
    app.get(lakepath,handleLakeIdGet);
}

exports.registerServer = function(app,bp){
    basepath = bp || '/';
    badeseendao = new BadeseenDAO();
    registerPaths(app);
};







