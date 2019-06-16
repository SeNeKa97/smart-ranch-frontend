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
        if(item)
            RoomService.remove(item.id)
            .then(result=>{
                alert(result);
            })
            .catch(err => alert(err))
    }

    render() { 
        return (
            <button className="btn btn-danger" onClick={this.remove}></button>
            ); 
    }
}

export default DeleteRoomButton;