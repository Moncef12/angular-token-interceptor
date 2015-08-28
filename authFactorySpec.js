describe('authFactory', function () {

    beforeEach(module('mabyo3'));
    beforeEach(inject(function (_authFactory_, _$window_, _$httpBackend_, _$q_) {
        authFactory = _authFactory_;
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    describe('isUserLogged', function () {

        it('should return false when user is not logged yet', function () {
            delete $window.localStorage.token;
            delete $window.localStorage.user;
            expect(authFactory.isUserLogged()).toBe(false);
        })

        it('should return true when user is logged', function () {
            $window.localStorage.token = 'notEmty';
            $window.localStorage.user = {};
            expect(authFactory.isUserLogged()).toBe(true);
        })

    })

    describe('#login', function () {
        var email ='hasseinbey@gmail.com',
            password = '123456';

        it('should register token when given correct email/password', function () {
            $httpBackend
                .expectPOST('/api/v1/login',{
                    email: email,
                    password: password
                })
                .respond(200, {
                    token: 'mlkqsdfOrA87755',
                    user: {email:'hasseinbey@gmail.com', password:'123456'}
                });

            authFactory.login(email, password);
            $httpBackend.flush();
            expect($window.localStorage.token).toBeDefined();
            expect($window.localStorage.user).toBeDefined();
            expect($window.localStorage.expire).toBeDefined();
            expect($window.localStorage.user).toContain('email');
            expect($window.localStorage.user).toContain('password');
            expect($window.localStorage.user).toContain(password);
        })

        it('should fail when giving wrong email or password', function () {
            $window.localStorage.clear();
            $httpBackend
                .expectPOST('/api/v1/login',{
                    email: email,
                    password: password
                })
                .respond(401, {errors:['password or email not correct']});

            authFactory.login(email, password);
            $httpBackend.flush();
            expect($window.localStorage.token).not.toBeDefined();
            expect($window.localStorage.user).not.toBeDefined();
        })
    })


    describe('#login', function () {
        xit('should go to home page using $location service', function () {
        })
    })

})
