import {address} from "./../config/serverSocket";
import {isAuthenticated, getToken} from './authService';


export default class RoleService{
    static getAll(){
        return fetch(address + "/roles", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching roles!"}));
            });
        });
    }

    static getById(id){
        return fetch(address + "/roles/" + id, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching role!"}));
            });
        });
    }
}