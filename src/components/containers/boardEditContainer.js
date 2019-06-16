import React from 'react';
import AuthService from './../../services/authService';
import BoardService from './../../services/boardService';
import { withRouter } from "react-router";
import {Redirect} from 'react-router-dom';


//let result = AuthService.authenticate(token);
class BoardEditContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id: null,
      loaded: false,
      authenticated: false,
      name: "",
      serial: "",
      dataLoaded: false
    }

    this.redirect = this.redirect.bind();
    this.nameHandle = this.nameHandle.bind();
    this.serialHandle = this.serialHandle.bind();

    this.checkName = this.checkName.bind();
    this.checkSerial = this.checkSerial.bind();

    this.validate = this.validate.bind();
    this.saveBoard = this.saveBoard.bind();

    this.goBack = this.goBack.bind();
  }

  componentDidMount(){
    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true)
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});

          BoardService.getById(this.state.id)
          .then(res => {
            if(result.error)
              alert("Помилка при завантаженні плати: "+ result.error);
            else
              {
                this.setState({dataLoaded: true, name: res.name, serial: res.serial});

              }
          })
        }

      this.setState({loaded:true});
    })
    .catch(err => {
      this.setState({authenticated: false, loaded: true});
    })
  }

  redirect = () => {
      if(this.state.loaded && !this.state.authenticated)
        return <Redirect to="/login"/>
  }

  nameHandle = (event) => {
    this.setState({name: event.target.value});
  }

  serialHandle = (event) => {
    let val = event.target.value;

    if(this.checkSerial(val))
      this.setState({serial: val});
  }

  checkName = (value) => {
    return value.match("^[^;^:]$");
  }

  checkSerial = (value) => {
    return value.match("^[0-9a-f]{0,10}$");
  }

  validate = () => {
    let result = true;
    if (this.state.name.length <= 1){
      alert("Назва плати повинна бути довшою за 1 символ!");
      result = false;
    }
    if (this.state.serial.length < 10 || this.state.serial.length > 10){
      alert("Серійний номер повинен мати довжину 10 символів!");
      result = false;
    }

    return result;
  }

  saveBoard = () => {
    if(this.validate())
      BoardService.update({id: this.state.id, name: this.state.name, serial: this.state.serial})
      .then(res=>{
        if(res.error)
          alert("Помилка при редагуванні плати!: "+res.error);
        else{
          alert("Дані про плату успішно змінені!");
          this.goBack();
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  goBack = () => {
    this.props.history.push("/boards");
  }


  render(){
    let id = this.props.match.params.id;

    if(!id)
      this.goBack();
    else
      this.state.id = id;

    return (
        <div>{
          this.redirect()
          }
          <h3>Редагувати плату</h3>
          <hr/>
            Назва плати:
            <input type="text" value={this.state.name} onChange={this.nameHandle} placeholder="Назва плати"/><br/>
            Серійний номер:
            <input type="text" value={this.state.serial} onChange={this.serialHandle} placeholder="Серійний номер"/>
            <hr/>
            <button className="btn btn-success btn-data" onClick={this.saveBoard} >ОК</button>
            <button className="btn btn-info btn-data" onClick={this.goBack}>Скасувати</button>
        </div>
        
      );
  }
}

export default withRouter(BoardEditContainer);