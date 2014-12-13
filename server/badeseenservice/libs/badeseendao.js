'use strict';

var Q = require('q');
var FS = require('fs');

var readFileQ = Q.nfbind(FS.readFile);


function BadeseenDAO(pathToFile){
    this.pathToFile = pathToFile || __dirname +'/badeseen.min.json';
}

/**
 * [getAllLakes Returns all lakes]
 * @return {[promise]} [[On success returns all]
 */
BadeseenDAO.prototype.getAllLakes = function(){
    return this._getAllLakesFromJsonQ();
};

/**
 * [getLakeById Return a specific lake by id]
 * @param {[integer]} id [id]
 * @return {[promise]} [On success returns a lake. On error or if a lake does not exist an error will be thrown.]
 */
BadeseenDAO.prototype.getLakeById = function(id){
    return this._getAllLakesFromJsonQ()
    .then(function(lakes){
        for(var i =0; i<lakes.length;i++){
            var lake = lakes[i];
            if(lake.id === id){
                return lake;
            }
        }
        throw new Error('lake with id ' + id + ' does not exist');
    });
};



BadeseenDAO.prototype._getAllLakesFromJsonQ = function(){
    return readFileQ(this.pathToFile)
    .then(function(data){
        var lakes = JSON.parse(data,'utf8');
        //add ids
        var id = 0;
        return lakes.map(function(lake){
            lake.id = id++;
            return lake;
        });
    });
};


module.exports = BadeseenDAO;