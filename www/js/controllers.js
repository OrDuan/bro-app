angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, Chats, $ionicPlatform, $cordovaMedia) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.chats = Chats.all();

        $scope.play = function (type) {
            var baseSrc = "sounds/" + type + ".wav";
            var src = ionic.Platform.isAndroid() ? "/android_asset/www/" + baseSrc: baseSrc;
            var media = new Media(src, null, null, null);
            media.play();
        }
    })
    

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
