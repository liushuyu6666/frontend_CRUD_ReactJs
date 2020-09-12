import React from "react";


export default class DetectInput extends React.PureComponent{
    constructor(props) {
        super(props);
        // console.log(props);
    }

    AfterChange = (event) => {
        event.preventDefault();
        event.target.setAttribute("style", "background: red");

        this.props.loadBuffer(this.props.rowId,
            this.props.fieldName, event.target.value);

        // console.log(this.props.rowId);
        // console.log(this.props.fieldName);
        // console.log(event.target.value);

    }

    render(){
        if(this.props.fieldName === "id"){
            return <input value={this.props.value} readOnly/>
        }
        else{
            return <input defaultValue={this.props.value} onChange={this.AfterChange}/>
        }
    }

}