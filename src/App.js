import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import AuthService from './services/authService';
import Home from './components/home';
import BoardTable from './components/containers/boardTableContainer';
import RoomTable from './components/containers/roomTableContainer';
import UserTable from './components/containers/userTableContainer';
import CurrentMeasurements from './components/containers/currentMeasurementsContainer';
import MeasurementStory from './components/containers/measurementStoryContainer';
import MeasurementStatistic from './components/containers/measurementStatisticContainer';
import AuthContainer from './components/containers/authContainer';
import PresetContainer from './components/containers/presetContainer';
import Profile from './components/containers/profileContainer';

import UserCreateContainer from './components/containers/userCreateContainer';
import UserEditContainer from './components/containers/userEditContainer';

import BoardCreateContainer from './components/containers/boardCreateContainer';
import BoardEditContainer from './components/containers/boardEditContainer';

import RoomCreateContainer from './components/containers/roomCreateContainer';
import RoomEditContainer from './components/containers/roomEditContainer';
//import PresetService from './services/presetService';
//import PresetContainer from './components/containers/presetContainer';
//import {getAll, getById, create, update, remove} from './services/userService'

//let result = AuthService.authenticate(token);
class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authResult: {}
    }

    this.check = this.check.bind();
  }
  
  componentDidMount(){
    
    /*
    AuthService.isAuthenticated()
    .then(res => {
      this.setState({authResult: res});
      let data = document.getElementById("user-data");
      data.innerText = this.state.authResult;
      //saveCredentials(res.token, res.username, res.role);
      console.log(res);
    })    
    .catch(err=>console.log(err));*/
    /*AuthService.authenticateCredentials("Bogdan", "my dear")
    .then(res => {
      this.setState({authResult: res});
      let data = document.getElementById("user-data");
      //data.innerText = this.state.authResult.username;
      //saveCredentials(res.token, res.username, res.role);
      console.log(res.username);
    })    
    .catch(err=>console.log(err));*/
    //AuthService.logout();
    /*
    remove(6)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>console.log(err));*/
  }

  check = () => {
    if(this.state.authResult){
      let data = document.getElementById("user-data");
      data.text = JSON.stringify(this.state.authResult);
      //console.
    }
      
    else
      return "no data";
  }

  render(){
  	let id = 4;
    return (
      <div className="wrapper">
        <div className="header">
          <img src={require("./images/smart-ranch-logo.png")} id="header-logo" alt="smart-ranch" height="100"/>
          <h2>SMART Ranch</h2>
        </div>

        <Router>
          <ul id="menu-list">
          	<li><Link to ="/measurements/current">Поточні значення</Link></li>
          	<li><Link to ="/measurements/story">Архівні значення</Link></li>
          	<li><Link to ="/measurements/statistic">Статистика</Link></li>
          	<li><Link to ="/presets">Змінити значення</Link></li>

          	<li><Link to ="/profile">Профіль</Link></li>
          </ul>
          <div className="content">
          	<Route exact path="/" component={Home}/>
          	<Route path="/measurements/current" component={CurrentMeasurements}/>
          	<Route path="/measurements/story" component={MeasurementStory}/>
          	<Route path="/measurements/statistic" component={MeasurementStatistic}/>
        
          	<Route path="/presets" component={PresetContainer}/>
          	<Route path="/login" component={AuthContainer}/>

          	<Route exact path="/boards" component={BoardTable}/>
            <Route path="/boards/edit/:id" component={BoardEditContainer}/>
            <Route path="/boards/create" component={BoardCreateContainer}/>

          	<Route exact path="/rooms" component={RoomTable}/>
            <Route path="/rooms/edit/:id" component={RoomEditContainer}/>
            <Route path="/rooms/create" component={RoomCreateContainer}/>

            <Route exact path="/users" component={UserTable}/>
            <Route path="/users/edit/:id" component={UserEditContainer}/>
            <Route path="/users/create" component={UserCreateContainer}/>

            <Route exact path="/home" component={Home}/>
          	<Route path="/profile" component={Profile}/>
          </div>
        </Router>
        </div>
      );
  }
}

export default App;
