import {address} from "./../config/serverSocket";
import AuthService from './authService';


export default class RoomService{

    static getAll(){
        return fetch(address + "/rooms", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching rooms!"}));
            });
        });
    }


    static getById(id){
        return fetch(address + "/rooms/" + id, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching room!"}));
            });
        });
    }


    static create(room){

        if(!room.description || !room.board)
            throw new TypeError("You must specify a room!");

        return fetch(address + "/rooms", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), description: room.description, idBoard: room.board})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error creating room!"}));
            });
        });
    }


    static update(room){

        if(!room.id || !room.description || !room.board)
            throw new TypeError("You must specify a room!");

        return fetch(address + "/rooms/update", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), id: room.id, description: room.description, idBoard: room.board})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error updating room!"}));
            });
        });
    }


    static remove(id){
        return fetch(address + "/rooms/" + id + "&" + AuthService.getToken(), {method: "DELETE"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error deleting room!"}));
            });
        });
    }
}