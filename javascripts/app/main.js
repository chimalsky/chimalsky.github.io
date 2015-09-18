requirejs.config({
    paths: {
        'knockout': '../vendor/knockout.js/knockout-3.1.0',
        'uberproto' : '../vendor/uberproto/proto',
        'async': '../vendor/async/async',
        'jquery': '../vendor/jquery/jquery',

        'controllers': './controllers'

    },
    shim: {
       
    }
});

define(function(require) {
    // Require Vendor/Lib JS files
    var ko = require('knockout');
    var $ = require('jquery');

    // Require our basic story/article viewmodel
    var Viewmodel = require('./story');


    ko.applyBindings(Viewmodel.create(9)); 
});