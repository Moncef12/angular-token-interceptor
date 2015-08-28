angular
    .module('myApp')
    .factory('authFactory', ['$http', '$location', '$window', '$q', '$rootScope', authFactory])


function authFactory($http, $location, $window, $q, $rootScope) {

    var apiBaseUrl = '/api/v1/';

    var service = {
        login: login,
        logout: logout,
        isUserLogged: isUserLogged
    };


    return service;

    //////////
    function isUserLogged()
    {
        return !!$window.localStorage.token || !!$window.localStorage.user;
    }


    function login(username, password){
        var deferred = $q.defer();

        return $http.post(apiBaseUrl+'login',{
            email: username,
            password: password
        }).success(function (data) {
            $window.localStorage.token =  data.token;
            $window.localStorage.user =  JSON.stringify(data.user);
            deferred.resolve(true);
        }).error(function () {
            deferred.reject('opps there is a problem when trying to authenticate');
        });

        return deferred.promise;
    }

    function logout(){
        if($window.localStorage.token || $window.localStorage.user){
            delete $window.localStorage.token;
            delete $window.localStorage.user;
        }

        $location.path('/');
    }
}
