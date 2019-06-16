import React from 'react';
import AuthService from './../../services/authService';
import {withRouter} from 'react-router';


//let result = AuthService.authenticate(token);
class UserProfile extends React.Component{
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
            <p>Користувач</p>
          </div>
          <div style={{display:"inline", float: "left"}}>
       
            <h5>Ви маєте можливість:</h5>
            <hr/>
            <ul style={{listStyleType: "none"}}>
              <li>- переглядати поточні дані;</li>
              <li>- переглядати архівні дані;</li>
              <li>- переглядати статистику даних;</li>
              <li>- змінювати допустимі значення.</li>
            </ul>
            <hr/>
            <button onClick={this.logout}>Вийти</button>
          </div>
          <div className="clearfix"></div>
        </div>
      );
  }
}

export default withRouter(UserProfile);
