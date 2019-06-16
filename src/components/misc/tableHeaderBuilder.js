import React from 'react';

class TableHeaderBuilder extends React.Component{
    constructor(props){
        super(props);

        this.buildHeader = this.buildHeader.bind();
    }

    buildHeader = (dataClass, item) => {
        switch (dataClass) {
            case "user":
                return (
                    <tr>
                        <th id="user-id-header">ID</th>
                        <th id="user-name-header">Ім'я</th>
                        <th id="user-activity-header">Остання активність</th>
                        <th id="user-role-header">Роль</th>
                        <th id="user-edit-header"></th>
                        <th id="user-delete-header"></th>
                    </tr>
                );
                break;
            case "board":
                return (
                    <tr>
                        <th id="board-id-header">ID</th>
                        <th id="board-name-header">Назва</th>
                        <th id="board-serial-header">Серійний номер</th>
                        <th id="board-edit-header"></th>
                        <th id="board-delete-header"></th>
                    </tr>
                );
                break;
            case "room":
                return (
                    <tr>
                        <th id="room-id-header">ID</th>
                        <th id="room-description-header">Опис</th>
                        <th id="room-activity-header">Плата</th>
                        <th id="room-edit-header"></th>
                        <th id="room-delete-header"></th>
                    </tr>
                );
                break;
            case "measurement":
                return (
                    <tr>
                        <th id="measurement-time-header">Час</th>
                        <th id="measurement-board-header">Плата</th>
                        <th id="measurement-type-header">Тип</th>
                        <th id="measurement-value-header">Значення</th>
                    </tr>
                );
                break;
            default:
                return false
        }
    }

    render(){return (
        <thead>{this.buildHeader(this.props.dataClass)}</thead>
    )}
}

export default TableHeaderBuilder;