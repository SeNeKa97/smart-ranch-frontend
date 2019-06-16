import hash from "object-hash";
import {address} from "./../config/serverSocket";

export default class AuthService{
    static isAuthenticated(){
        let token = AuthService.getToken();

        if(token)
            return AuthService.authenticate(token)
            .then(result=>{

                if(!result.error && result.token)
                    return true;
                return false;
            })
        else
            return new Promise(resolve => resolve(false));
    }


    static authenticate(token){
        return fetch(address + "/auth/token",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: token})
        })
        .then(function(res){

            let resultJson = res.json();
            return resultJson.then(result=>{
                if(result.status)
                    if(result.status === 400){
                        throw new Error("Error authenticating");
                    }
                //console.log(result)
                if(result.error)
                    throw new Error(result.error);
                    //return new Promise(reject=>reject({error: "Error authenticating"}));

                const token = result.token;
                const user = result.username;
                const role = result.role;

                AuthService.saveCredentials(token, user, role);

                return result;
            })
        })
    }


    static authenticateCredentials(username, password){
        let passwordHash = hash(password, {algorithm: 'md5'});

        return fetch(address + "/auth/credentials",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name: username, passwordHash: passwordHash})
        })
        .then(function(res){
            let resultJson = res.json();
            return resultJson.then(result=>{
                if(result.error)
                    throw new Error(result.error);

                const token = result.token;
                const user = result.username;
                const role = result.role;

                AuthService.saveCredentials(token, user, role);

                return result;
            })
        })
    }


    static saveCredentials(token, user, role){
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role);
    }


    static getToken(){
        return localStorage["token"];
    }


    static getRole(){
        return localStorage["role"];
    }

    static getUser(){
        return localStorage["user"];
    }


    static logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
    }
}