angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, Chats, $state) {
        $scope.chats = Chats.all();
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
        
        $scope.showUser = function (userId) {
            $state.go('tab.new-message', {userId: userId});
        };
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('SendMessageCtrl', function($scope, $stateParams, Chats, Bros, $http) {
        $scope.user = Chats.get($stateParams.userId);
        $scope.bros = Bros.all();

        $scope.send = function (user, bro) {
            $http.post('api/new/message', {
                userId: user.userId,
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
            });
        }
    });
