angular
    .module('myApp')
    .factory('tokenInterceptor', tokenInterceptor); 


tokenInterceptor.$inject =   ['$q', '$window'];


function tokenInterceptor($http, $window) {


    var service = {
        response: response,
        request: request
    };

    return service;


    //////////
    function response(response){
        return response;
    }

    function request(config){
        config.headers = config.headers || {};

        if($window.localStorage.token){
            config.headers['x-access-token'] = $window.localStorage.token;
        }

        return config || $q.when(config);
    }
}
