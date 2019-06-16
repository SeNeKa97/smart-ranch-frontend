import React from 'react';

class EditBoardButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item: {}
        }

        this.edit = this.edit.bind();
    }

    edit = (event) => {
        if(this.state.item)
            alert("redirected to edit board"+item.id);
    }

    render() { 
        this.state.item = this.props.item;
        return (
            <button className="btn btn-success" onClick={this.edit}>Редагувати</button>
            ); 
    }
}

export default EditBoardButton;