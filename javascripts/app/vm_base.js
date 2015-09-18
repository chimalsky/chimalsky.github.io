define(function(require) {
    var ko = require('knockout');
    var proto = require('uberproto');

    var postController = require('controllers/c_post');

    var VmBase = proto.extend({
        init: function() {
            
        },

        getPost: function(postId) {
            var self = this;

            // Fetch the pertinent post from API
            postController.getPostById(postId, null, function(err, post) {
                if (!err && post) {
                    self.title(post.title);
                    self.author(post.author.name);
                    self.storyElements(self.compileStoryElements(post.content));

                    self.date(self.prettifyDate(post.date));

                    self.removeInlineStyling();
                } else {
                    alert(err);
                }
            });
        },

        compileStoryElements: function(content) {
            return content.split("\n");
        },

        removeInlineStyling: function() {
            // Remove WP inline styling
            var spans = document.getElementsByTagName("span");

            for (var i = 0; i < spans.length; i++) {
                spans[i].removeAttribute('style');
            }
        },

        prettifyDate: function(ugly) {
            var split = ugly.split('-');

            var daySplit = split[2].split('T');

            var pretty = {
                day: daySplit[0],
                month: split[1],
                year: split[0]
            };
            return pretty;
        }
    });

    return VmBase;
});