define(function(require) {
    var ko = require('knockout');

    var VmBase = require('./vm_base');
    var StoryVm = VmBase.extend({
        init: function(postId) {
            var self = this;
            self.title = ko.observable();
            self.author = ko.observable();
            self.storyElements = ko.observableArray();
            self.illustrator = 'Joel Peven';
            self.date = ko.observable({day: undefined, month: undefined, year: undefined});

            self.getPost(postId);
        },
        activate: function() {
        }
    });

    return StoryVm;
});