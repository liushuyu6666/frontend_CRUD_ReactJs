import React, {Component} from "react";
import DetectInput from "./DetectInput";
import UpdateButton from "./UpdateButton";
import AddRow from "./AddRow";
import DeleteButton from "./DeleteButton";

class GraphicButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            data: [],
            row: [],

        }
        // need to be clean after clicking update button
        this.update = {};
        // need to be clean after clicking create button
        this.create = {};
    }

    updateRequest = (rowId, fieldName, value) => {
        this.update[rowId + "@" + fieldName] = value;
        // console.log(this.update);
    }

    preparePostRequest = (rowId, fieldName, value) => {
        if(rowId === null){
            this.create[fieldName] = value;
        }
        else{
            this.update[rowId + "@" + fieldName] = value;
        }
    }

    listGraphic = (event) => {

        let willRemove = document.getElementById("tbody").firstChild
        while(willRemove !== null){
            document.getElementById("tbody").removeChild(willRemove);
            willRemove = document.getElementById("tbody").firstChild
        }

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

    clearUpdateDate = () => {
        this.update = {};
    }

    addRow = (event) => {
        event.preventDefault();
        this.setState({"row": [...this.state.row, 1]});
    }

    deleteOneRow = (event, rowId) => {
        event.preventDefault();
        let url = "http://localhost:8080/v1/graphic_cards/" + rowId;
        console.log(url);
        fetch(url, {method: "DELETE"})
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
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
                    <tbody id={"tbody"}>
                    {
                        this.state.data.map((row, rowIndex) => (
                            <tr key={row[rowIndex]}>
                                {Object.values(row).map((ele, eleIndex) => (
                                    <td key={ele}>
                                        <DetectInput fieldName={Object.keys(row)[eleIndex]}
                                                  value={ele} rowId={row["id"]} recordUpdate={this.updateRequest}/>
                                    </td>
                                ))}
                                <DeleteButton key={row[rowIndex]} whichRow={row["id"]} removeHandle={this.deleteOneRow}/>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <UpdateButton updateData={this.update} reload={this.listGraphic} clearUpdateData={this.clearUpdateDate}/>
                <br/>
                <AddRow rownum={this.state.row} fields={this.state.fields} detectInput={this.createRequest}/>
            </>
        )
    }

}

export default GraphicButton