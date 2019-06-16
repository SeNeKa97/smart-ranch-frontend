import React from 'react';
import RoomService from './../../services/roomService';

class EditRoomButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item: {}
        }

        this.edit = this.edit.bind();
    }

    edit = (event) => {
        if(this.state.item)
            alert("redirected to edit room "+item.id);
    }

    render() { 
        this.state.item = this.props.item;
        return (
            <button className="btn btn-success" onClick={this.edit}>Редагувати</button>
            ); 
    }
}

export default EditRoomButton;