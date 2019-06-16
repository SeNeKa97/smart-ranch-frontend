import {address} from "./../config/serverSocket";
import AuthService from './authService';


export default class UserService{
    
    static getAll(){
        return fetch(address + "/users", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching users!"}));
            });
        });
    }


    static getById(id){
        return fetch(address + "/users/" + id, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching user!"}));
            });
        });
    }


    static create(user){

        if(!user.name || !user.password || !user.role)
            throw new TypeError("You must specify a user!");

        return fetch(address + "/users", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), name: user.name, password: user.password, idRole: user.role})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error creating user!"}));
            });
        });
    }


    static update(user){

        if(!user.id || !user.name || !user.password || !user.role)
            throw new TypeError("You must specify a user!");

        return fetch(address + "/users/update", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), id: user.id, name: user.name, password: user.password, idRole: user.role})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error updating user!"}));
            });
        });
    }


    static remove(id){
        return fetch(address + "/users/" + id + "&" + AuthService.getToken(), {method: "DELETE"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result.error)
                    return new Promise(reject=>reject({error: "Error deleting users!"}));
                
                return result;
            });
        });
    }
}