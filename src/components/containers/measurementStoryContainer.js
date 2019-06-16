import React from 'react';
import MeasurementService from './../../services/measurementService';
import TableBuilder from './../misc/tableBuilder';
import BoardService from './../../services/boardService';
import MeasurementTypeService from './../../services/measurementTypeService';

//let result = AuthService.authenticate(token);
class MeasurementStoryContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      data: null,
      types: null,
      boards: null,
      selectedBoard: 2,
      selectedType: 2
    }

    this.build = this.build.bind();
    this.export = this.export.bind();
    this.convertToCSV = this.convertToCSV.bind();
    this.exportCSVFile = this.exportCSVFile.bind();
    this.fetch = this.fetch.bind();

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

boardSelectorChange = (event) => {
    this.setState({selectedBoard: event.target.value});
  }

  typeSelectorChange = (event) => {
    this.setState({selectedType: event.target.value});
  }

  build = () => {
    if(this.state.loaded)
      return <>
        <h3>Історія вимірів датчиків</h3>
        <hr/>
        <div className="data-input">
        Обріть плату:<br/>
        <select id="select-board" value={this.state.selectedBoard} onChange={this.boardSelectorChange}>
          {
            this.state.boards.map(item=>{
              return <option key={item.id} value={item.id}>{item.name}</option>
            })
          }
        </select>
        </div>
        <div className="data-input">
        Обріть критерій виміру:<br/>
        <select id="select-type" value={this.state.selectedType} onChange={this.typeSelectorChange}>
          {
            this.state.types.map(item=>{
              return <option key={item.id} value={item.id}>{item.name}</option>
            })
          }
        </select>
        </div>
        <button className="btn btn-info btn-data" onClick={this.fetch}>Завантажити</button>
        <div class="clearfix"></div>
        </>
  }

  buildTable = () => {
    if(this.state.data)
      return <>
        <button className="btn btn-info" onClick={this.export}>Експорт</button>  
        <TableBuilder dataClass="measurement" data={this.state.data} style={{visibility:"hidden"}}>Архів вимірів</TableBuilder>
      </>
  }

  fetch = () => {
    let board = this.state.selectedBoard;
    let type = this.state.selectedType;
    if(!board || !type){
      alert("Ви повинні обрати плату та параметр виміру!");
      return null;
    }

    MeasurementService.getByType(board, type)
    .then(res => {
      if(res)
        this.setState({data: res});
      })
    .catch(err => {
    alert(err);
    })
  }

  export = () => {
    let data = this.state.data;
    let newData = [];
    data.map(item=>{
      newData.push({id:item.id, idBoard:item.idBoard, idType:item.idType, timestamp:item.timestamp, value:item.value})
    })
    console.log(newData);

    let csv = this.convertToCSV(data);
    let headers = {
      id:"Id", idBoard:"IdBoard", idType: "IdType", timestamp: "Timestamp", value:"Value"
    }

    this.exportCSVFile(headers, newData, 'measurements');
  }


  render(){
    return (<div>
          { this.build()}
          {this.buildTable()}

        </div>)
  }




  convertToCSV = (objArray) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

exportCSVFile = (headers, items, fileTitle) => {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

}

export default MeasurementStoryContainer;