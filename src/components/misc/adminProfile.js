import React from 'react';
import {Link, Route} from 'react-router-dom';
import BoardTable from './../containers/boardTableContainer';
import RoomTable from './../containers/roomTableContainer';
import UserTable from './../containers/userTableContainer';
import AuthService from './../../services/authService';
import {withRouter} from 'react-router';



class AdminProfile extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      
    }
    this.logout = this.logout.bind();
  }

  componentDidMount(){
    
  }

  logout = () => {
    AuthService.logout();
    this.props.history.push("/login");
  }


  render(){
    return (
        <div>
          <h3>Профіль користувача</h3>
          <hr/>
          <div style={{float:"left"}}>
            <img src={require('./../../images/admin.png')} alt="admin avatar" />
            <p>*Адміністратор</p>
          </div>
          <div style={{display:"inline", float: "left"}}>
            <h5>Адміністративна панель</h5>
            <hr/>
            <Link to="/boards">Таблиця плат</Link><br/>
            <Link to="/rooms">Таблиця загонів</Link><br/>
            <Link to="/users">Таблиця користувачів</Link><br/>

            <Route exact path="/boards" component={BoardTable}/>
            <Route exact path="/rooms" component={RoomTable}/>
            <Route exact path="/users" component={UserTable}/>
            <hr/>
            <button onClick={this.logout}>Вийти</button>
          </div>
          <div className="clearfix"></div>
        </div>
      );
  }
}

export default withRouter(AdminProfile);
