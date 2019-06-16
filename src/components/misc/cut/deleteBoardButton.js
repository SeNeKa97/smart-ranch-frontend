import React from 'react';
import DeleteButton from './deleteButton'
import BoardService from './../../services/boardService';

class DeleteBoardButton extends DeleteButton{
    constructor(props){
        super(props);

        this.state = {
            item: {}
        }

        this.remove = this.remove.bind();
    }

    remove = (item) => {
        if(item)
            BoardService.remove(item.id)
            .then(result=>{
                alert(result);
            })
            .catch(err => alert(err))
    }

    render() { 
        this.state.item = this.props.item;
        return (
            <button className="btn btn-danger" onClick={this.remove}></button>
            ); 
    }
}

export default DeleteBoardButton;