angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {
        $scope.userData = {
            totalBros: 132,
            lastWeek: 3
        };
    })

    .controller('ChatsCtrl', function($scope, Message, $state) {
        $scope.messages = Message.all();
        $scope.media = null;

        $scope.play = function (type) {
            var baseSrc = "sounds/" + type + ".wav";
            var src = ionic.Platform.isAndroid() ? "/android_asset/www/" + baseSrc : baseSrc;
            if ($scope.media) {
                $scope.media.stop();
                $scope.media.release();
            }

            $scope.media = new Media(src, null, null, null);
            $scope.media.play();
        };

        $scope.showMessage = function (messageId) {
            $state.go('tab.show-message', {messageId: messageId});
        };
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })


    .controller('newMessageCtrl', function($scope, $cordovaContacts, $ionicLoading, $http) {
        $scope.pickContactUsingNativeUI = function () {
            $cordovaContacts.pickContact().then(function (contactPicked) {
                $scope.pickedContact = contactPicked;
                $ionicLoading.show({
                    template: '<ion-spinner icon="crescent"></ion-spinner>',
                    duration: 10000
                });

                $http.post('/api/verify-contact', {
                    data: contactPicked
                }).then(function (response) {
                    $scope.hasApp = response.data.hasApp;
                    $scope.pickedContact = contactPicked;
                    $ionicLoading.hide();
                });
            })
        };


    })

    .controller('ShowMessageCtrl', function($scope, $stateParams, Message, Bros, $http, $ionicPopup) {
        $scope.message = Message.get($stateParams.messageId);
        $scope.bros = Bros.all();

        $scope.send = function (user, bro) {
            $http.post('api/new/message', {
                messageId: $scope.userId,
                bro: bro.id,
            }).then(function (response) {
                if (response.data.status == 'OK'){
                    $ionicPopup.alert({
                        title: 'Bro message was sent!',
                        template: $scope.user.name + ' will get your bro message! :)'
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
        }
    });
