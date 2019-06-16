import React from 'react';
import {Redirect} from 'react-router-dom';
import { withRouter } from "react-router";

class EditButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            path: null,
            item: null,
            pushed: false
        }

        this.edit = this.edit.bind();
        this.init = this.init.bind();
    }

    edit = (event) => {
        let path = this.state.path;
        let item = this.state.item;

        if(path && item)
            this.setState({pushed: true});
    }

    redirect = () => {
        if (this.state.pushed===true){
            this.setState({pushed: false})
            this.props.history.push(this.state.path + "edit/" + this.state.item.id);
            //return <Redirect from={this.state.path} to={this.state.path + "edit/" + this.state.item.id}/>
        }

    }

    init = (path, item) => {
        this.state.path = path;
        this.state.item = item;
    }

    render() { 
        this.init(this.props.path, this.props.dataItem);

        return (
            <>
                <button className="btn btn-success" onClick={this.edit}>Редагувати</button>
                {this.redirect()}
            </>
            ); 
    }
}

export default withRouter(EditButton);