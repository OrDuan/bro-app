angular.module('starter.services', [])

    .factory('Message', function($http, $ionicPopup) {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var messages = [{
            id: '9asdasd87asdas7asd8',
            sender: {
                userId: '9as7fsa98f7asd89fas789f',
                name: 'Nati Harray'
            },
            bro: {
                name: 'Crazy Bro',
                code: 'bro1'
            }
        }, {
            id: '9asd87as789asd8asd8',
            sender: {
                userId: 'a9s8f7a9sdf79a8sdfasdf',
                name: 'Or Duan'
            },
            bro: {
                name: 'Lol Bro',
                code: 'bro2'
            }
        }, {
            id: 'sdf87asdf978a7234j',
            sender: {
                userId: 'as97f9a8sdf98asdf78',
                name: 'Omer Korner'
            },
            bro: {
                name: 'Normal Bro',
                code: 'bro3'
            }
        }];


        return {
            all: function() {
                return messages;
            },
            create: function (recipient, bro) {
                $http.post('api/new/message', {
                    recipientId: recipient.id,
                    broId: bro.id,
                }).then(function (response) {
                    if (response.data.status == 'OK'){
                        $ionicPopup.alert({
                            title: 'Bro message was sent!',
                            template: response.data.recipientName + ' will get your bro message! :)'
                        });
                    } else {
                        $ionicPopup.alert({
                            title: 'ERROR!',
                            template: response.data.error
                        });
                    }
                }, function () {
                    $ionicPopup.alert({
                        title: 'ERROR!',
                        template: "SERVER ERROR"
                    });
                });
            },
            get: function(id) {
                var i;
                for (i = 0; i < messages.length; i++) {
                    if (messages[i].id === id) {
                        return messages[i];
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
            code: 'bro1',
        }, {
            id: 2,
            name: 'Normal Bro',
            code: 'bro2',
        }, {
            id: 3,
            name: 'Lol Bro',
            code: 'bro3',
        }];

        return {
            all: function() {
                return bros;
            },
        };
    });
