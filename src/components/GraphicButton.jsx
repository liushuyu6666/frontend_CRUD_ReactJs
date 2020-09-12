import React, {Component} from "react";
import DetectInput from "./DetectInput";
import UpdateButton from "./UpdateButton";

class GraphicButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            data: [],

        }
        // need to be clean after clicking update button
        this.update = {};
    }

    updateRequest = (rowId, fieldName, value) => {
        this.update[rowId + "@" + fieldName] = value;
        // console.log(this.update);
    }

    listGraphic = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/v1/graphic_cards", {method: "GET"})
            .then(res => res.json())
            .then((data) => {
                if(data !== null){
                    // populate fields name
                    this.setState({"fields": Object.keys(data.result[0])});
                    data.result.map(item => {
                        this.setState({"data": [...this.state.data, item]});
                    })
                }
            });
    }

    render() {
        return(
            <>
                <button className={"btn btn-primary"} onClick={this.listGraphic}>display all graphic cards</button>
                <table>
                    <thead>
                        <tr>
                            {this.state.fields.map(item => (
                                <th key={item}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((row, rowIndex) => (
                            <tr key={row[rowIndex]}>
                                {Object.values(row).map((ele, eleIndex) => (
                                    <td key={ele}>
                                        {eleIndex === 0? <label>{ele}</label> :
                                            <DetectInput fieldName={Object.keys(row)[eleIndex]}
                                                      value={ele} rowId={row["id"]} recordUpdate={this.updateRequest}/>}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <UpdateButton updateData={this.update}/>
            </>
        )
    }

}

export default GraphicButton