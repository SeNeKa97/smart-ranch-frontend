import React from 'react';
import AuthService from './../../services/authService';
import BoardService from './../../services/boardService';
import MeasurementService from './../../services/measurementService';

//let result = AuthService.authenticate(token);
class CurrentMeasurementContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: {
        temperature:null,
        humidity:null,
        luminosity:null,
        water_level:null,
        food_level:null
      },
      boards: null,
      loaded: false,
      selectedBoard: 2,
      dataLoaded: true,
      buttonClicked: false
    }

    this.setCoroutine = this.setCoroutine.bind();
    this.build = this.build.bind();
    this.boardSelectorChange = this.boardSelectorChange.bind();
    this.getData = this.getData.bind();
  }

  componentDidMount(){
   
        BoardService.getAll()
        .then(result => {
          if(result){
            this.setState({boards: result, loaded: true});
          }
        })
    .catch(err => console.log(err));
  }


  componentWillUnmount() {
    this.state.dataLoaded = false;
  }


  setCoroutine = (event) => {
      
      this.state.buttonClicked=true;
      this.timer = setInterval(()=> {
          console.log(this.state)
        if(this.state.dataLoaded){
          this.setState.dataLoaded= false;
          this.getData(this.state.selectedBoard);
        }
      }, 5000);
  }

  getData=(board)=>{

    MeasurementService.getLatest(board)
    .then((responseData) =>
    {
      this.setState({data: responseData});
      this.setState({dataLoaded: true})
    })
    .catch((error) => {
        console.error(error);
    });

}

  boardSelectorChange = (event) => {
    this.setState({selectedBoard: event.target.value});
  }

  build = () => {
    if(this.state.loaded)
      return <>
        <h3>Поточні виміри датчиків</h3>
        <hr/>
        <div className="data-input">
          Оберіть плату: <br/>
          <select id="select-board" value={this.state.selectedBoard} onChange={this.boardSelectorChange}>
            {
              this.state.boards.map(item=>{
                return <option key={item.id} value={item.id}>{item.name}</option>
              })
            }
          </select>
        </div>
        <button className="btn btn-info" onClick={this.setCoroutine}>Обрати</button>
        <div className="clearfix"></div>
        <br/>
        
        <table>
        <tr>
          <td>Температура, *С:</td><td><input type="text" value={this.state.data.temperature}/></td>
        </tr>
        <tr>
          <td>Вологість, %:</td><td><input type="text" value={this.state.data.humidity}/></td>
        </tr>
        <tr>
          <td>Освітленість, лк:</td><td><input type="text" value={this.state.data.luminosity}/></td>
        </tr>
        <tr>
          <td>Рівень води, %:</td><td><input type="text" value={this.state.data.water_level}/></td>
        </tr>
        <tr>
          <td>Рівень корму, %:</td><td><input type="text" value={this.state.data.food_level}/></td>
        </tr>
      </table>
      </>
  }

  render(){
    return (
        <div>
          {this.build()}
        </div>
      );
  }
}

export default CurrentMeasurementContainer;