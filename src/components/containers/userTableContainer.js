import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from './../../services/authService';
import UserService from './../../services/userService';
import TableBuilder from './../misc/tableBuilder';

//let result = AuthService.authenticate(token);
class UserTableContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      authenticated: false,
      data: null
    }

    this.redirect = this.redirect.bind();
    this.build = this.build.bind();
    this.createUser = this.createUser.bind();
  }

  
  componentDidMount(){

    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true){
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});
          
          UserService.getAll()
          .then(res => {
            if(res)
              this.setState({data: res});
          })
          .catch(err => {
            alert(err);
          })
        }
      }
      this.setState({loaded:true});
      
    })
    .catch(err => {
      this.setState({authenticated: false, loaded: true});
    })
  }

  build = () => {
    if(this.state.loaded && this.state.data)
      return <>
        <h3>Список користувачів</h3>
        <hr/>
        <button className="btn btn-info" onClick={this.createUser}>Додати користувача</button>
        <br/>
        <TableBuilder dataClass="user" data={this.state.data} style={{visibility:"hidden"}}>Board Table</TableBuilder>
      </>
  }

  createUser = () => {
    this.props.history.push("/users/create");
  }

  redirect = () => {
    //console.log(this.state.loaded);
    //console.log(this.state.authenticated);
      if(!this.state.loaded)
        return false
      if(this.state.loaded && !this.state.authenticated){
        //console.log("redirected")
        return <Redirect to="/login"/>
      }
  }


  render(){
    return (<div>

          { this.redirect()}
          { this.build()}
          

        </div>)
  }

}

export default UserTableContainer;