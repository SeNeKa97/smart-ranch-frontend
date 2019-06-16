import AuthService from './../services/authService';

it('AuthService.isAuthenticated returns true if token is right', () => {
    expect.assertions(1);

    AuthService.saveCredentials("46cb619afac8e69", "Bogdan", 3);
    
    return AuthService.isAuthenticated()
        .then(res => {
            expect(res).toEqual(true);
    })
    .catch(error => expect(error).toEqual("Error authenticating"))
});


it('AuthService.isAuthenticated returns false if there is no token', () => {
    expect.assertions(1);
    
    AuthService.logout();

    return AuthService.isAuthenticated()
        .then(res => {
            expect(res).toEqual(false);
    });
});


it('AuthService.isAuthenticated returns false if token is wrong or outdated', () => {
    expect.assertions(1);

    AuthService.saveCredentials("wrong token", "Bogdan", 3);
    
    return AuthService.isAuthenticated()
        .then(res => {
            expect(res).toEqual(false);
    })
});


it('AuthService.authenticate returns and sets credentials if token is right', () => {
    expect.assertions(2);

    AuthService.logout();
    return AuthService.authenticate("46cb619afac8e69")
        .then(res=>{
            expect(res.token).toEqual("46cb619afac8e69");
            expect(AuthService.getToken()).toEqual("46cb619afac8e69");
        })
});


it('AuthService.authenticate returns error if token is wrong', () => {
    expect.assertions(1);

    AuthService.logout();
    return AuthService.authenticate("wrong token")
        .then(res=>{
            expect(res.error).toEqual("Error authenticating");
        })
});


it('AuthService.authenticateCredentials returns and sets credentials if creds are right', () => {
    expect.assertions(2);

    AuthService.logout();

    return AuthService.authenticateCredentials("Bogdan", "my dear")
        .then(res=>{
            expect(res.token).toEqual("46cb619afac8e69");
            expect(AuthService.getToken()).toEqual("46cb619afac8e69");
        })
});


it('AuthService.authenticateCredentials returns error if creds are wrong', () => {
    expect.assertions(1);

    AuthService.logout();
    return AuthService.authenticateCredentials("Empty", "random")
        .then(res=>{
            expect(res.error).toEqual("Error authenticating");
        })
});