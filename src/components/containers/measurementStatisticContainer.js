import React from 'react';
import MeasurementService from './../../services/measurementService';
import TableBuilder from './../misc/tableBuilder';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import BoardService from './../../services/boardService';
import MeasurementTypeService from './../../services/measurementTypeService';


class MeasurementStatisticContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      types: null,
      boards: null,
      loaded: false,
      chartData: {
        labels:[],
        datasets:[{}]
      },
      chartOptions: {
        legend: {
          display: false
        },
        width:"800",
        height:"400",
        elements: {
            line: {
                tension: 0,
                borderColor: 'rgba(0, 128, 255, 1)'
            }
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    format: "YYYY-MM-DD HH:mm:ss",
                    time: {
                        unit: 'minute',
                        displayFormats: {
                          minute: 'YYYY/MM/DD HH:mm'
                        }
                    }
                }]
          }
      },
      selectedType: 2,
      selectedBoard: 2,
    }

    this.build = this.build.bind();
    this.buildChart = this.buildChart.bind();
    this.export = this.export.bind();

    this.boardSelectorChange = this.boardSelectorChange.bind();
    this.typeSelectorChange = this.typeSelectorChange.bind();
  }

  
  componentDidMount(){
    MeasurementTypeService.getAll()
    .then(res=>{
      if(res){
        let types = res;
        BoardService.getAll()
        .then(result => {
          if(result){
            this.setState({types: types, boards: result, loaded: true});
          }
        })
      }
    })
    .catch(err => console.log(err));
  }



  buildChart = () => {
    let selectedType = this.state.selectedType;
    let selectedBoard = this.state.selectedBoard;


    if(!selectedType || !selectedBoard)
      alert("Потрібно обрати плату та параметр виміру!");
    else{
      MeasurementService.getTop(selectedBoard, selectedType)
      .then(res => {
        if(res){
          let data = res;
          let chartData = {};
          
          let labels = [];
          let values = [];

          data.map(item=>{
            labels.push(new Date(item.timestamp));
            values.push(item.value);
          });

          chartData.labels = labels;
          chartData.datasets = [{data: values, fill: false}];

          this.setState({chartData: chartData});          

          let exportButton = document.getElementById("export-button");
          exportButton.style.visibility = "visible";
        }
      })
      .catch(err => {
      alert(err);
      })
    }
  }


  export = () => {
    let chart = this.refs.lineChart.chartInstance.canvas;


    var link = document.createElement("a");
    var imgData = chart.toDataURL({    format: 'png',
        multiplier: 4});
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);

    link.download = "chart.png";
    link.href = objurl;
    link.click();


    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }
  }

  boardSelectorChange = (event) => {
    this.setState({selectedBoard: event.target.value});
  }

  typeSelectorChange = (event) => {
    this.setState({selectedType: event.target.value});
  }


  build = () => {
    if(this.state.loaded && this.state.boards && this.state.types)
      return <>
        <div className="data-input">
          Обріть плату: <br/>
          <select id="select-board" value={this.state.selectedBoard} onChange={this.boardSelectorChange}>
            {
              this.state.boards.map(item=>{
                return <option key={item.id} value={item.id}>{item.name}</option>
              })
            }
          </select>
        </div>
        <div className="data-input">
          Обріть критерій вимірювань: <br/>
          <select id="select-type" value={this.state.selectedType} onChange={this.typeSelectorChange}>
            {
              this.state.types.map(item=>{
                return <option key={item.id} value={item.id}>{item.name}</option>
              })
            }
          </select>
        </div>
        <button className="btn btn-success" id="load-button" onClick={this.buildChart}>Завантажити</button>
        <div className="clearfix"></div>
        <div width="800" height="600">
          <Line ref="lineChart" data={this.state.chartData} id="line-chart" options={this.state.chartOptions}></Line>
        </div>
        <button className="btn btn-info" id="export-button" onClick={this.export} style = {{visibility: "hidden"}}>Експортувати</button>
      </>
  }




  render(){
    return (<div>

          { this.build()}
          

        </div>)
  }

}

export default MeasurementStatisticContainer;