angular.module('starter.services', [])

    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Nati Harray',
            userId: 'nati131',
            status: 'I\'m free todo what I want',
            type: 'bro1',
            broName: 'Crazy Bro'
        }, {
            id: 2,
            userId: 'or113',
            name: 'Or Duan',
            status: 'Jinja Developer',
            type: 'bro2',
            broName: 'Normal Bro'
        }, {
            id: 3,
            name: 'Nobody',
            userId: 'Nobody132',
            status: 'I\'m no body',
            type: 'bro3',
            broName: 'Lol Bro'
        }];

        return {
            all: function() {
                return chats;
            },
            get: function(userId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].userId === userId) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Bros', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var bros = [{
            id: 0,
            name: 'Crazy Bro',
            type: 'bro1',
        }, {
            id: 2,
            name: 'Normal Bro',
            type: 'bro2',
        }, {
            id: 3,
            name: 'Lol Bro',
            type: 'bro3',
        }];

        return {
            all: function() {
                return bros;
            },
        };
    });
