angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {
        $scope.userData = {
            totalBros: 132,
            lastDay: 1,
            lastWeek: 3
        };
    })

    .controller('ChatsCtrl', function($scope, Message, $state) {
        $scope.messages = Message.all();
        $scope.media = null;

        $scope.play = function (typeCode) {
            var baseSrc = "sounds/" + typeCode + ".wav";
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
                    $scope.user = response.data.user;
                    $ionicLoading.hide();
                });
            })
        };

        $scope.pickBro = function (bro) {
            Message.create($scope.user.id, bro);
        }


    })

    .controller('ShowMessageCtrl', function($scope, $stateParams, Message, Bros) {
        $scope.message = Message.get($stateParams.messageId);
        $scope.brosList = Bros.all();

        $scope.pickBro = function (bro) {
            Message.create($scope.message.user.id, bro);
        }
    });
