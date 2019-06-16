import {address} from "./../config/serverSocket";
import AuthService from './authService';

export default class BoardService{
    static getAll(){
        return fetch(address + "/boards", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                return new Promise(reject=>reject({error: "Error fetching boards!"}));
            });
        });
    }

    static getById(id){
        return fetch(address + "/boards/" + id, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                return new Promise(reject=>reject({error: "Error fetching board!"}));
            });
        });
    }
    static create(board){

        if(!board.name || !board.serial)
            return new Promise((resolve, reject) => reject({error: "You must specify a board!"}));

        return fetch(address + "/boards", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), name: board.name, serial: board.serial})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error creating board!"}));
            });
        });
    }


    static update(board){
        if(!board.id || !board.name || !board.serial)
            return new Promise((resolve, reject) => reject({error: "You must specify a board!"}));

        return fetch(address + "/boards/update/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), id: board.id, name: board.name, serial: board.serial})
        })
        .then(res => {
            let resultGet = res.json();
        
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error updating board!"}));
            });
        });
    }


    static remove(id){
        return fetch(address + "/boards/" + id + "&" + AuthService.getToken(), {method: "delete"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error deleting board!"}));
            });
        });
    }
}