 import React from 'react';

class EditUserButton extends React.Component{
	constructor(props){
        super(props);

        this.state = {
            item: {}
        }

        this.edit = this.edit.bind();
    }

    edit = (event) => {
        if(this.state.item)
            alert("redirected to edit user"+item.id);
    }

    render() { 
        this.state.item = this.props.item;
        return (
            <button className="btn btn-success" onClick={this.edit}>Редагувати</button>
            ); 
    }
}

export default EditUserButton;