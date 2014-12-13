'use strict';
var should = require('should');
var Q = require('q');
var BadeseenDAO = require(__dirname + '/../libs/badeseendao');



describe('Badeseendao', function () {
    var dao;
    beforeEach(function() {
        dao = new BadeseenDAO();
    });

    describe('#getAllLakes',function(){        
        it('should have 65 lakes and every object has a property id',function(done){
            dao.getAllLakes()
            .then(function(lakes){
                lakes.should.be.an.Array.and.have.length(65);
                lakes.map(function(lake){
                    lake.should.be.an.Object.and.have.property('id');
                });

                done();
            })
            .catch(function(err){
                done(err);
            });
        });
    });
    describe('#getLakeById',function(){        
        it('should have lakes with id 0 - 64',function(done){
            var ids = [];
            for(var i = 0;i<65;i++){
                ids.push(i);
            }

            Q.all(ids.map(function(id){
                return dao.getLakeById(id)
                .then(function(lake){
                    lake.should.have.property('id');
                    lake.id.should.be.a.Number.and.exactly(id);
                });
            }))
            .then(function(){
                done();
            })
            .catch(function(err){
                done(err);
            });
        });
        it('should not have lakes with id -1 67 or blub',function(done){
            var ids = [-1,67,'blub'];           

            Q.all(ids.map(function(id){
                return dao.getLakeById(id)                
                .catch(function(){
                    //ok
                })
                .then(function(lake){
                    should.not.exist(lake);
                });                
            }))
            .then(function(){
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

    });
});
