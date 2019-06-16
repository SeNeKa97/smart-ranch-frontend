import React from 'react';
import DeleteButton from './deleteButton';
import RoomService from './../../services/roomService';

class DeleteRoomButton extends DeleteButton{
    constructor(props){
        super(props);

        this.state = {

        }

        this.remove = this.remove.bind();
    }

    remove = (item) => {

    }

    render() { 
        return false; 
    }
}

export default DeleteRoomButton;