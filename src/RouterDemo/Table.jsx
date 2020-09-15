import React, {Component} from "react";
import {Link} from "react-router-dom";

class Table extends Component{
    constructor(props) {
        super(props);
    }





    render(){

        return(
            <table>
                <thead>
                    <tr>
                        {this.props.columns.map(item =>
                        <th>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                {this.props.data.length > 0 &&
                this.props.data.map(row => (
                    <tr>
                        {this.props.columns.map(ele =>
                            <td>{row[ele]}</td>)}
                            <td>
                                <Link>Edit</Link>
                                <button name={row.id}
                                        onClick={this.props.deleteHandler}>Delete</button>
                            </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
        )
    }
}

export default Table;