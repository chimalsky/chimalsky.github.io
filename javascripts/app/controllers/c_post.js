define(function (require) {
    var ControllerBase = require('./controller_base');

    var PostController = ControllerBase.extend({
        init: function() {
        },

        get: function(queryParams, callback){
            var self = this;
            
            self.apiCall('GET', '/posts', null, queryParams, function(err, response){
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, response);
                }
            })
        },

        getPostById: function(id, queryParams, callback) {
            var self = this;

            self.apiCall('GET', '/posts', id, queryParams, function(err, response) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, response);
                }
            });
        }
    });

    return PostController.create();
});