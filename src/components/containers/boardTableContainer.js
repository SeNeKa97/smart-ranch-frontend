import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from './../../services/authService';
import BoardService from './../../services/boardService';
import TableBuilder from './../misc/tableBuilder';

//let result = AuthService.authenticate(token);
class BoardTableContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      authenticated: false,
      data: null
    }

    this.redirect = this.redirect.bind();
    this.build = this.build.bind();
    this.createBoard = this.createBoard.bind();
  }

  
  componentDidMount(){

    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true){
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});

          BoardService.getAll()
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

  createBoard = () => {
    this.props.history.push('/boards/create');
  }

  build = () => {
    if(this.state.loaded && this.state.data)
      return <>
        <h3>Список плат</h3>
        <hr/>
        <button className="btn btn-info" onClick={this.createBoard}>Додати плату</button>
        <br/>
        <TableBuilder dataClass="board" data={this.state.data} style={{visibility:"hidden"}}>Board Table</TableBuilder>
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

export default BoardTableContainer;