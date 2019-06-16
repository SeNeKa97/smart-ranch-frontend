import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from './../../services/authService';
import RoomService from './../../services/roomService';
import TableBuilder from './../misc/tableBuilder';

//let result = AuthService.authenticate(token);
class RoomTableContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      authenticated: false,
      data: null
    }

    this.redirect = this.redirect.bind();
    this.build = this.build.bind();
    this.createRoom = this.createRoom.bind();
  }

  
  componentDidMount(){

    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true){
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});

          RoomService.getAll()
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

  createRoom = () => {
    this.props.history.push('/rooms/create');
  }

  build = () => {
    if(this.state.loaded && this.state.data)
      return <>
        <h3>Список загонів</h3>
        <hr/>
        <button className="btn btn-info" onClick={this.createRoom}>Додати загон</button>
        <br/>
        <TableBuilder dataClass="room" data={this.state.data} style={{visibility:"hidden"}}>Room table</TableBuilder>
        </>
  }

  redirect = () => {
      if(this.state.loaded && !this.state.authenticated)
        return <Redirect to="/login"/>
  }


  render(){
    return (<div>

          { this.redirect()}
          { this.build()}
          

        </div>)
  }

}

export default RoomTableContainer;