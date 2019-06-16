import {address} from "./../config/serverSocket";
import AuthService from './authService';


export default class PresetService{

    static getAll(){
        return fetch(address + "/presets", {method: "GET"})
        .then(res => {
            let resultGet = res.json();
            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error fetching system presets!"}));
            });
        });
    }


    static update(presetsBundle){

        if (!presetsBundle.tempMin  || !presetsBundle.tempMax  ||
            !presetsBundle.humidMin || !presetsBundle.humidMax ||
            !presetsBundle.luminMin || !presetsBundle.luminMax ||
            !presetsBundle.waterMin || !presetsBundle.waterMax ||
            !presetsBundle.foodMin  || !presetsBundle.foodMax  ||
            !presetsBundle.wasteDelay)
            throw new TypeError("You must specify a presets bundle!");
            

        return fetch(address + "/presets/update", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token: AuthService.getToken(), ...presetsBundle})
        })
        .then(res => {
            let resultGet = res.json();

            return resultGet.then(result => {
                if(result && !result.error)
                    return result;
                else
                    return new Promise(reject=>reject({error: "Error updating system presets!"}));
            });
        });
    }
}