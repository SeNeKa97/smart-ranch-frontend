import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthService from './../../services/authService';
import Home from './../home';
import {withRouter} from 'react-router';


//let result = AuthService.authenticate(token);
class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authenticated: false,
      login: "",
      password: ""
    }

    this.handleLogin = this.handleLogin.bind();
    this.handlePassword = this.handlePassword.bind();
    this.validate = this.validate.bind();
    this.authenticate = this.authenticate.bind();
  }

  componentDidMount(){
    
  }

  authenticate =(event) => {
  	AuthService.authenticateCredentials(this.state.login, this.state.password)
  	.then(result => {
      if(result.error)
        alert("Помилка при вході: "+result.error)
      else{
  		  this.setState({authenticated: true})
        this.props.history.push("/profile");
      }
  	})
  	.catch(err=>alert(err.message))
  }

  handleLogin = (event) => {
  		this.setState({login: event.target.value})
  }

  handlePassword = (event) => {

  		this.setState({password: event.target.value})
  }

  validate = (value) => {
  	return value.match("[\wЁёА-Яа-я\-\d]+ig");
  }



  render(){
    return (
    	<div>
          <h3>Авторизуватися</h3>
          <hr/>
          <div className="auth-wrapper">
  	    		<input type="text" value={this.state.login} onChange={this.handleLogin} required placeholder="login"/>
  	    		<input type="password" value={this.state.password} onChange={this.handlePassword} required placeholder="password"/>

  	    		<button className="btn btn-success btn-auth" onClick={this.authenticate}>Увійти</button>
          </div>
    	</div>
      );
  }
}

export default withRouter(AuthContainer);
