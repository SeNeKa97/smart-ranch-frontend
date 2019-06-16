import React from 'react';
import DeleteButton from './deleteButton';
import UserService from './../../services/userService';

class DeleteUserButton extends DeleteButton{{
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

export default DeleteUserButton;