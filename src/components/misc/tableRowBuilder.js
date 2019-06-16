import React from 'react';
import DeleteButton from './deleteButton';
import EditButton from './editButton';


class TableRowBuilder extends React.Component{
    constructor(props){
        super(props);

        this.buildRow = this.buildRow.bind();
        this.typeAlias = this.typeAlias.bind();
    }

    typeAlias = (value) => {
        switch (value){
            case 2:
                return 'Температура';
            case 3:
                return 'Вологість';
            case 4:
                return 'Освітленість';
            case 5:
                return 'Вода';
            case 6:
                return 'Корм';
            case 7:
                return 'Прибирання';
            default:
                return 'Новідомий тип'
        }
    }

    buildRow = (dataClass, item, callback) => {
        //console.log(item)
        switch (dataClass) {
            case "user":
                return (
                    <>
                        <td id="user-id-column">{item.id}</td>
                        <td id="user-name-column">{item.name}</td>
                        <td id="user-activity-column">{item.lastActivity}</td>
                        <td id="user-role-column">{item.Role.name}</td>
                        <td id="user-edit-column"><EditButton path={"/users/"} dataItem={item}/></td>
                        <td id="user-delete-column"><DeleteButton dataClass={dataClass} item={item} callback={callback}/></td>
                    </>
                );
                break;
            case "board":
                return (
                    <>
                        <td id="board-id-column">{item.id}</td>
                        <td id="board-name-column">{item.name}</td>
                        <td id="board-serial-column">{item.serial}</td>
                        <td id="board-edit-column"><EditButton path={"/boards/"} dataItem={item}/></td>
                        <td id="board-delete-column"><DeleteButton dataClass={dataClass} item={item} callback={callback}/></td>
                    </>
                );
                break;
            case "room":
                return (
                    <>
                        <td id="room-id-column">{item.id}</td>
                        <td id="room-description-column">{item.description}</td>
                        <td id="room-activity-column">{item.Board.name}</td>
                        <td id="room-edit-column"><EditButton path={"/rooms/"} dataItem={item}/></td>
                        <td id="room-delete-column"><DeleteButton dataClass={dataClass} item={item} callback={callback}/></td>
                    </>
                );
                break;
            case "measurement":
                return (
                    <>
                        <td id="measurement-time-column">{item.timestamp}</td>
                        <td id="measurement-board-column">{item.idBoard}</td>
                        <td id="measurement-type-column">{this.typeAlias(item.idType)}</td>
                        <td id="measurement-value-column">{item.value}</td>
                    </>
                );
                break;
            default:
                return false
        }
    }

    render(){
        let dataClass = this.props.dataClass;
        let dataItem = this.props.dataItem;
        let callback = this.props.callback;
        
        return (
            <tr>{this.buildRow(dataClass, dataItem, callback)}</tr>
    )}
}

export default TableRowBuilder;