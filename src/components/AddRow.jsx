import React from "react";
import DetectInput from "./DetectInput";


export default class AddRow extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    AddOneRow = (event) => {
        event.preventDefault();
        console.log(this.props);
    }

    render() {
        return(
            <form id={"create"}>
                <table>
                    <tbody id={"create-body"}>
                        <tr>
                            {this.props.fields.map(item => (
                                <DetectInput rowId={null} fieldName={item} value={null}/>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <button id={"button-row"} className={"btn btn-success"}
                        onClick={this.AddOneRow}>create</button>
            </form>

        )
    }

}