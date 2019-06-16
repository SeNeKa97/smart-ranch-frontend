import AuthService from './../services/authService';
import BoardService from './../services/boardService';

it('BoardService.getById returns board with specified id', () => {
    expect.assertions(1);

    return BoardService.getById(2)
        .then(res=>{
            expect(res.id).toEqual(2);
        })
});

it('BoardService.create returns created board if user is authenticated', () => {
    expect.assertions(1);
    let result = {};

    return AuthService.authenticate("46cb619afac8e69")
    .then(result=>{
        return BoardService.create({name: "Test board", serial: "1234567890"})
            .then(res=>{
                result = res;
                expect(res.name).toEqual("Test board");
            })
    })
});


it('BoardService.create returns error if user is authenticated', () => {
    expect.assertions(1);

    AuthService.logout();
    return BoardService.create({name: "Test board", serial: "1234567890"})
        .then(res=>{
            expect(res.error).toEqual("Error creating board!");
        })
});


it('BoardService.update returns updated board if user is authenticated', () => {
    expect.assertions(1);
    let result = {};

    return AuthService.authenticate("46cb619afac8e69")
    .then(result=>{
        return BoardService.update({id: 18, name: "Test updated board", serial: "1234567890"})
            .then(res=>{
                expect(res.name).toEqual("Test updated board");
            })
    })
});


it('BoardService.update returns updated board if user is authenticated', () => {
    expect.assertions(1);
    let result = {};

    AuthService.logout()
    return BoardService.update({id: 18, name: "Test updated board", serial: "1234567890"})
            .then(res=>{
                expect(res.error).toEqual("Error creating board!");
            })
 
});


it('BoardService.update returns updated board if user is authenticated', () => {
    expect.assertions(1);
    let result = {};

    AuthService.logout()
    return BoardService.update({id: 18, name: "Test updated board", serial: "1234567890"})
            .then(res=>{
                expect(res.error).toEqual("Error creating board!");
            })
 
});