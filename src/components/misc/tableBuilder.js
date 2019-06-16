import React from 'react';
import TableHeaderBuilder from './tableHeaderBuilder';
import TableRowBuilder from './tableRowBuilder';

class TableBuilder extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: null,
            updated: false
        }

        this.buildTable = this.buildTable.bind();
        this.deleteCallback = this.deleteCallback.bind();
    }

    buildTable = (dataClass, items) => {
        //console.log(dataClass);
        return (<table className="data-table">
                    <TableHeaderBuilder dataClass={dataClass}/>
                    <tbody>
                        {items.map(item=>{
                            return <TableRowBuilder key={item.id} dataClass={dataClass} dataItem={item} callback={this.deleteCallback}/>
                        })}
                    </tbody>
                </table>);
    }

    deleteCallback = (deleted) =>{
        //console.log(deleted)
        let newState = this.state.data;
        newState = newState.filter(item=>item.id!=deleted.id)
        //console.log(newState);
        this.setState({data: newState});
    }

    render(){
        this.state.dataClass = this.props.dataClass;
        this.state.data = this.props.data;
        return (
        <>
            {this.buildTable(this.props.dataClass, this.props.data)}
        </>
    )}
}

export default TableBuilder;