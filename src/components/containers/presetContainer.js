import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from './../../services/authService';
import PresetService from './../../services/presetService';
//import {getAll, getById, create, update, remove} from './services/userService'

//let result = AuthService.authenticate(token);
class PresetContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authenticated: false,
      loaded: false,

      tempMin: null,
      tempMax: 30,
      humidMn: 40,
      humidMax: 90,
      luminMin: 40,
      luminMax: 80,
      waterMin: 10,
      waterMax: 100,
      foodMin: 10, 
      foodMax: 100,
      wasteDelay: 14400,

      errorMessage: {}
    }
    this.handleChange = this.handleChange.bind();
    this.build = this.build.bind();
    this.submitUpdate = this.submitUpdate.bind();
  }

  componentDidMount(){
    let presets = document.getElementById("preset-form");
    let loadError = document.getElementById("load-error");

    //console.log(localStorage);

    //AuthService.authenticateCredentials("Bogdan", "my dear");

    AuthService.isAuthenticated()
    .then(authState=>{
      if(authState === true)
        this.setState({authenticated: true})
        PresetService.getAll()
        .then(presetsBundle =>{
          this.setState({loaded: true, ...presetsBundle})
          
          //presets.style.visibility = "visible";
        })
      this.setState({loaded: true});        
    }).catch(err => {
          loadError.style.visibility = "visible";
          this.setState({loaded: true, authenticated: false, errorMessage: err});
          console.log(err)
        })
  }


  submitUpdate = () =>{
    let presetsBundle = {

      tempMin: this.state.tempMin,
      tempMax: this.state.tempMax,

      humidMin: this.state.humidMin,
      humidMax: this.state.humidMax,

      luminMin: this.state.luminMin,
      luminMax: this.state.luminMax,

      waterMin: this.state.waterMin,
      waterMax: this.state.waterMax,

      foodMin: this.state.foodMin,
      foodMax: this.state.foodMax,

      wasteDelay: this.state.wasteDelay
    };

    PresetService.update(presetsBundle)
    .then(()=>alert("Успішно оновлено!"))
    .catch(err=>{
      console.log(err);
    })
  }

  handleChange = (event, field, maxValue) =>{
    console.log(field);
      let val;

      if(isNaN(val = parseInt(event.target.value)))
        val=0;
      if(val>maxValue)
        val=maxValue;
      this.setState(JSON.parse("{\""+field+"\": "+val+"}"));
  }



  build = () => {
    if(!this.state.loaded)
      return false
    if(!this.state.authenticated)
      return <Redirect to="/login"/>

    if(this.state.loaded && this.state.authenticated)
      return <div id="presets-body">
        <form id="preset-form" >
            <h3>Редагувати допустимі значення</h3>
            <hr/>
            <table>
              <tr>
                <td>Мінімальна температура, *С:</td>
                <td><input id="temp-min" type="text" value={this.state.tempMin} onChange={e=>this.handleChange(e, "tempMin", 30)}/></td>
              </tr>
              <tr>
                <td>Максимальна температура, *С:</td>
                <td><input required id="temp-max" type="text" value={this.state.tempMax} onChange={e=>this.handleChange(e, "tempMax", 40)}/></td>
              </tr>

              <tr>
                <td>Мінімальна вологість, %:</td>
                <td><input required id="humid-min" type="text" value={this.state.humidMin} onChange={e=>this.handleChange(e, "humidMin", 99)}/></td>
              </tr>
              <tr>
                <td>Максимальна вологість, %:</td>
                <td><input required id="humid-max" type="text" value={this.state.humidMax} onChange={e=>this.handleChange(e, "humidMax", 100)}/></td>
              </tr>

              <tr>
                <td>Мінімальний рівень освітленості, лк:</td>
                <td><input required id="lumin-min" type="text" value={this.state.luminMin} onChange={e=>this.handleChange(e, "luminMin", 99)}/></td>
              </tr>
              <tr>
                <td>Максимальний рівень освітленості, лк:</td>
                <td><input required id="lumin-max" type="text" value={this.state.luminMax} onChange={e=>this.handleChange(e, "luminMax", 100)}/></td>
              </tr>

              <tr>
                <td>Мінімальний рівень води, %:</td>
                <td><input required id="water-min" type="text" value={this.state.waterMin} onChange={e=>this.handleChange(e, "waterMin", 99)}/></td>
              </tr>
              <tr>
                <td>Максимальний рівень води, %:</td>
                <td><input required id="water-max" type="text" value={this.state.waterMax} onChange={e=>this.handleChange(e, "waterMax", 100)}/></td>
              </tr>

              <tr>
                <td>Мінімальний рівень корму, %:</td>
                <td><input required id="food-min" type="text" value={this.state.foodMin} onChange={e=>this.handleChange(e, "foodMin", 99)}/></td>
              </tr>
              <tr>
                <td>Максимальний рівень корму, %:</td>
                <td><input required id="food-max" type="text" value={this.state.foodMax} onChange={e=>this.handleChange(e, "foodMax", 100)}/></td>
              </tr>

              <tr>
                <td>Інтервал між прибиранням, сек:</td>
                <td><input required id="waste-delay" type="text" value={this.state.wasteDelay} onChange={e=>this.handleChange(e, "wasteDelay", 999999)}/></td>
              </tr>
            </table>
            

            <hr/>
            <input id="save-button" className="btn btn-success" value="OK" onClick={this.submitUpdate}/>
        </form>
        <div id="load-error" style={{visibility: "hidden"}}></div>
      </div>
  }


  render(){
  	let id = 4;
    return (
      <>
        {this.build()}</>
      );
  }
}

export default PresetContainer;
