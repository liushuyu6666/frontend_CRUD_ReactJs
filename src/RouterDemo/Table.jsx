import React, {Component} from "react";
import {Link} from "react-router-dom";

class Table extends Component{
    constructor(props) {
        super(props);
    }





    render(){

        return(
            <div className={"container"}>
                <div className={"row justify-content-md-center"}>
                    <table className={"table table-stripted"}>
                        <thead>
                        <tr>
                            {this.props.columns.map(item =>
                                <th scope={"col"}>{item}</th>)}
                            <th>operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data !== null &&
                        this.props.data.map(row => (
                                <tr>
                                    {this.props.columns.map(ele =>
                                        <td>{row[ele]}</td>)}
                                    <td>
                                        <Link to={`/graphicCards/${row.id}/edit`} className={"btn btn-link"}>Edit</Link>
                                        <button name={row.id}
                                                onClick={this.props.deleteHandler}
                                        className={"btn btn-primary"}>Delete</button>
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default Table;