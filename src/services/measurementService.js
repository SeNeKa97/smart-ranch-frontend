import {address} from "./../config/serverSocket";

export default class MeasurementService{
    static getAll(){
        return fetch(address + "/measurements", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                return new Promise(reject=>reject({error: "Error fetching measurements!"}));
            });
        });
    }
/*
    static getByBoard(boardId){
        return fetch(address + "/measurements/" + boardId, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {

                if(!result)
                    return new Promise(reject=>reject({error: "Error fetching measurements!"}));
                if(result.error)
                    return new Promise(reject=>reject({error: "Error fetching measurements!"}));
                
                return result;
            });
        });
    }*/

    static getByType(boardId, type){

        return fetch(address + "/measurements/type/" + boardId + "&" + type, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching measurements!"}));
                
                
            });
        });
    }

    static getTop(boardId, type){

        return fetch(address + "/measurements/top/" + boardId + "&" + type, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching measurements!"}));
                
                
            });
        });
    }

    static getLatest(boardId){
        return fetch(address + '/measurements/latest/'+boardId, {method: 'GET'})
        .then(res=>{
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching measurements!"}));
                
                
            });
        })
    }
}