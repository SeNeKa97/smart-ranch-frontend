import {address} from "./../config/serverSocket";

export default class MeasurementTypeService{
    static getAll(){
        return fetch(address + "/measurementtypes", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching measurement types!"}));
            });
        });
    }

    static getById(id){
        return fetch(address + "/measurementtypes/" + id, {method: "GET"})
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching measurement type!"}));
            });
        });
    }
}