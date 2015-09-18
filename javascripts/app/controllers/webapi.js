define(function (require) {
    var async = require('async');
    var proto = require('uberproto');

    //
    //Server Configuration
    //
    var serverConfig = {
        api_server: {
            scheme: 'https',
            host: 'public-api.wordpress.com/rest/v1.1/sites/adagiaapi.wordpress.com'
        }
    };

    var WebApi = proto.extend({
        init: function() {
        },
        getServerUrl: function() {
            var serverUrl = serverConfig.api_server.scheme + "://" + serverConfig.api_server.host;
            if (serverConfig.api_server.port)
                serverUrl += ":" + serverConfig.api_server.port;

            return serverUrl;
        },
        //
        //jwt is handled in the controller_base
        //
        call: function(method, path, methodParam, queryParams, jwt, callback) {
            var self = this;

            if (methodParam) {
                var apiUrl = self.getServerUrl() + path + '/' + methodParam;
            } else {
                var apiUrl = self.getServerUrl() + path;
            };

            var jqxhr = $.ajax({
                url: apiUrl,
                type: method,
                dataType: 'json',
                data: queryParams,

                /*beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", jwt); //jason web token.
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }*/
            }).done(function(data){
                callback(undefined, data);
            }).fail(function(err){
                callback(err);
            }).always(function(){

            });
        }
    });

    return WebApi.create();
});