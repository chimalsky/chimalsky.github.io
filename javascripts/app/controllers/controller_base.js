define(function (require) {
    var async     = require('async');
    var proto = require('uberproto');
    var webApi    = require('./webapi');

    var ControllerBase = proto.extend({
        init: function() {

        },

        apiCall: function(method, path, methodParam, queryParams, callback, option) {

            //The option checking
            var isAuthRequired = false;

            var token;
            async.series([
                function(done){
                    if(token || !isAuthRequired){
                        done(undefined, token);
                    } else {
                        done('JWT does not exist.');
                    }
                },
                function(done){
                    webApi.call(method, path, methodParam, queryParams, token, function(err, response){
                        done(err, response);
                    });
                }
            ], function(err, results){
                if (err) {
                    callback(err);
                }else{
                    var response = results[1];
                    //Verify if server issued any valid jwt token. If not, then users have to re-login.
                    
                    callback(undefined, response);
                }
            });

        }
    });

    return ControllerBase;
});