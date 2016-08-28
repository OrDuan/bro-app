angular.module('starter.services', [])

    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Nati Harray',
            status: 'I\'m free todo what I want',
            type: 'bro1',
        }, {
            id: 2,
            name: 'Or Duan',
            status: 'Jinja Developer',
            type: 'bro2',
        }, {
            id: 3,
            name: 'Nobody',
            status: 'I\m no body',
            type: 'bro3',
        }];

        return {
            all: function() {
                return chats;
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
