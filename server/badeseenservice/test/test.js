'use strict';
/* jshint unused:false*/
var should = require('should');
var request = require('supertest');
// var Q = require('q');
var express = require('express');



describe('Badeseenservice', function () {
    var badeseenservice;
    var app;
    beforeEach(function() {
        badeseenservice = require( __dirname + '/../index.js');
        app = express();
        badeseenservice.registerServer(app,'/');
    });    
    describe('get /lakes', function(){
        it('should return all lakes',function(done){
            request(app)
            .get('/lakes')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(lakes){
                lakes.body.should.be.a.Array.and.have.length(65);
                lakes.body.map(function(lake){
                    lake.should.have.property('id');
                });
            })
            .end(done);
        });
    });

    describe('get /lake', function(){
        it('should fail',function(done){
            request(app)
            .get('/lake')
            .expect(404)
            // .expect('Content-Type', /json/)
            .end(done);
        });
    });

    describe('get /lake/0', function(){
        it('should return lake with id 0',function(done){
            request(app)
            .get('/lake/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(lake){
                lake.body.should.be.a.Object.and.have.a.property('id');
                lake.body.id.should.be.a.Number.and.be.exactly(0);                
            })
            .end(done);
        });
    });

    describe('get /lake/test', function(){
        it('should fail',function(done){
            request(app)
            .get('/lake/test')
            .expect(400)            
            .end(done);
        });
    });

    describe('get /lake/-1', function(){
        it('should fail and not exist',function(done){
            request(app)
            .get('/lake/-1')
            .expect(404)            
            .end(done);
        });
    });
});
