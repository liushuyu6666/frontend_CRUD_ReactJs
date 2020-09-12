import React from "react";
import DetectInput from "./DetectInput";


export default class CreateButton extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    createPost = (event) => {
        event.preventDefault();
        let url = "http://localhost:8080/v1/graphic_cards";
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.createData)
        }
        fetch(url, options)
            .then(res => res.json())
            .then(data => this.props.clearCreateData())
            .catch(error => console.error(error));

    }

    render() {
        return(

            <button id={"button-row"} className={"btn btn-success"}
                        onClick={this.createPost}>create</button>


        )
    }

}