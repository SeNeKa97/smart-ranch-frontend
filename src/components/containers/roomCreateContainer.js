import React from 'react';
import AuthService from './../../services/authService';
import RoomService from './../../services/roomService';
import BoardService from './../../services/boardService';
import { withRouter } from "react-router";
import {Redirect} from 'react-router-dom';


//let result = AuthService.authenticate(token);
class RoomCreateContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      authenticated: false,
      description: "",
      boards: null,
      selectedBoard: 2,
      dataLoaded: false
    }

    this.redirect = this.redirect.bind();
    this.descriptionHandle = this.descriptionHandle.bind();
    this.boardHandle = this.boardHandle.bind();

    this.validate = this.validate.bind();
    this.saveRoom = this.saveRoom.bind();

    this.goBack = this.goBack.bind();
  }

  componentDidMount(){
    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true)
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});

          BoardService.getAll()
          .then(res => {
            if(res.error)
              alert("Помилка при завантаженні плат!: "+res.error)
            else{
              this.setState({boards: res, dataLoaded: true});
            }
          })
        }
        else{
          this.props.history.push("/login");
        }

      this.setState({loaded:true});
    })
    .catch(err => {
      this.setState({authenticated: false, loaded: true});
    })
  }

  descriptionHandle = (event) => {
    let val = event.target.value;

      this.setState({description: val});
  }

  boardHandle = (event) => {
    this.setState({selectedBoard: event.target.value});
  }


  validate = () => {
    let result = true;
    if (this.state.description.length <= 1){
      alert("Опис загону повинен бути довшим за 1 символ!");
      result = false;
    }

    return result;
  }


  saveRoom = () => {
    if(this.validate())
      RoomService.create({description: this.state.description, board: this.state.selectedBoard})
      .then(res=>{
        if(res.error)
          alert("Помилка при додаванні загону!: "+res.error);
        else{
          alert("Загон успішно створений!");
          this.goBack();
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  goBack = () => {
    this.props.history.push("/rooms");
  }

  redirect = () =>{
    if(this.state.loaded && !this.state.authenticated)
    return <Redirect to="/login"/>
  }

  build = () => {
    if(this.state.loaded && this.state.dataLoaded)
      return <>
            <h3>Додати загон</h3>
            <hr/>
            Опис загону:
            <input id="description-input" type="text" value={this.state.description} onChange={this.descriptionHandle} placeholder="Опис загону"/><br/>
            Плата:
            <select value={this.state.selectedBoard} onChange={this.boardHandle}>
            {
                this.state.boards.map(item=>{
                  return <option value={item.id}>{item.name}</option>
                })
            }
            </select>
            <hr/>

            <button className="btn btn-success btn-data" onClick={this.saveRoom} >ОК</button>
            <button className="btn btn-info btn-data" onClick={this.goBack}>Скасувати</button>
          </>
  }

  render(){
    return (
        <div>
        {this.redirect()}
          {this.build()}
        </div>
      );
  }
}

export default RoomCreateContainer;