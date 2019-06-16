import React from 'react';
import AuthService from './../../services/authService';
import UserService from './../../services/userService';
import { withRouter } from "react-router";
import {Redirect} from 'react-router-dom';


//let result = AuthService.authenticate(token);
class UserEditContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
   	  id: null,
      loaded: false,
      authenticated: false,
      name: "",
      password: "",
      selectedRole: 2,
      dataLoaded: false
    }

    this.redirect = this.redirect.bind();
    this.nameHandle = this.nameHandle.bind();
    this.passHandle = this.passHandle.bind();


    this.validate = this.validate.bind();
    this.saveUser = this.saveUser.bind();

    this.goBack = this.goBack.bind();
  }

  componentDidMount(){
    AuthService.isAuthenticated()
    .then(result=>{
      if(result === true)
        if(AuthService.getRole()>=3){
          this.setState({authenticated: true});
        }
        UserService.getById(this.state.id)
          .then(res => {
            if(result.error)
              alert("Помилка при завантаженні даних користувача: "+ result.error);
            else
              {
                this.setState({dataLoaded: true, name: res.name, selectedRole: res.idRole});
              }
        })

      this.setState({loaded:true});
    })
    .catch(err => {
      this.setState({authenticated: false, loaded: true});
    })
  }


  nameHandle = (event) => {
    let val = event.target.value;


      this.setState({name: val});
  }

  passHandle = (event) => {
    let val = event.target.value;


      this.setState({password: val});
  }

  roleHandle = (event) => {
    this.setState({selectedRole: event.target.value});
  }


  validate = () => {
    let result = true;
    if (this.state.name.length <= 1){
      alert("Ім'я повинна бути довшим за 1 символ!");
      result = false;
    }

    if (this.state.password.length <= 1){
      alert("Пароль повинен бути довшим за 1 символ!");
      result = false;
    }

    return result;
  }


  saveUser = () => {
    if(this.validate())
      UserService.update({id: this.state.id, name: this.state.name, password: this.state.password, role: this.state.selectedRole})
      .then(res=>{
        if(res.error)
          alert("Помилка при оновленні користувача!: "+res.error);
        else{
          alert("Дані користувача успішно оновлено!");
          this.goBack();
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  goBack = () => {
    this.props.history.push("/users");
  }

  redirect = () =>{
    if(this.state.loaded && !this.state.authenticated)
    return <Redirect to="/login"/>
  }



  render(){
  	let id = this.props.match.params.id;

    if(!id)
      this.goBack();
    else
      this.state.id = id;

    return (
        <div>
        {
          this.redirect()
        }
          <h3>Редагувати користувача</h3>
          <hr/>
          	Назва профілю:
            <input id="name-input" type="text" value={this.state.name} onChange={this.nameHandle} placeholder="Ім'я користувача"/><br/>
            Пароль:
            <input id="password-input" type="text" value={this.state.password} onChange={this.passHandle} placeholder="Пароль"/><br/>
            Роль користувача:
            <select value={this.state.selectedRole} onChange={this.roleHandle}>
              <option value={2}>Користувач</option>
              <option value={3}>Адміністратор</option>
            </select>
            <hr/>
            <button className="btn btn-success btn-data" onClick={this.saveUser} >ОК</button>
            <button className="btn btn-info btn-data" onClick={this.goBack}>Скасувати</button>
        </div>
      );
  }
}

export default UserEditContainer;