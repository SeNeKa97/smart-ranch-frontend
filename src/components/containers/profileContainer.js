import React from 'react';
import AuthService from './../../services/authService';
import AdminProfile from './../misc/adminProfile';
import UserProfile from './../misc/userProfile';
import { Route, Redirect } from 'react-router'

//let result = AuthService.authenticate(token);
class ProfileContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isAdmin: false,
      authenticated: false,
      loaded: false
    }
    this.profile = this.profile.bind();
  }

  componentDidMount(){
    AuthService.isAuthenticated()
    .then(result => {
      
      if(result)
        this.setState({authenticated: true, loaded: true});
      else
        this.setState({loaded: true});

      let role = AuthService.getRole();

      if(role>=3)
        this.setState({isAdmin: true});
    })
    .catch(err => {
      console.log(err)
      this.setState({authenticated: false, loaded: true});
    })
    
  }


  profile = () =>{
    if(!this.state.loaded)
      return false
    if(!this.state.authenticated)
      return <Redirect to="/login"/>


      if (this.state.isAdmin)
        return <AdminProfile/>
      else
        return <UserProfile/>
  }


  render(){
    return (
        <div>
          {
            this.profile()
          }         
        </div>
      );
  }
}

export default ProfileContainer;