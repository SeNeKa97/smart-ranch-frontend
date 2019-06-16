import React from 'react';
import BoardService from './../../services/boardService';
import RoomService from './../../services/roomService';
import UserService from './../../services/userService';

class DeleteButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            service: null,
            item: null,
            callback: null
        }
        this.remove = this.remove.bind();
        this.init = this.init.bind();
    }

    remove = (event) => {
        //console.log(this.state.service);
        let service = this.state.service;
        let item = this.state.item;


        if(service && item)
            service.remove(item.id)
            .then(result=>{
                alert("Елемент видалено!");
                this.state.callback(item);
            })
            .catch(err => {
                alert(err);
            })
    }

    init = (serviceName, item, callback) => {
        let service = null;
        switch(serviceName){
            case "board":
                service = BoardService;
                break;
            case "room":
                service = RoomService;
                break;
            case "user":
                service = UserService;
                break;
            case "measurement":
                service = UserService;
                break;
        }

        this.state.service = service;
        this.state.item = item;
        this.state.callback = callback;
    }

    render() { 
        this.init(this.props.dataClass, this.props.item, this.props.callback);
        return (
            <button className="btn btn-danger" onClick={this.remove}>Видалити</button>
            ); 
    }
}

export default DeleteButton;