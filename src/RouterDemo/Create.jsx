import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";


class Create extends Component{

    constructor(props) {
        super(props);
    }

    // submitHandle = (event) => {
    //     let url = "http://localhost:8080/v1/graphic_cards";
    //     event.preventDefault();
    //     let data = {}
    //     this.props.column.map((item) => {
    //         data[item] = document.getElementById(item).value;
    //     })
    //     fetch(url,
    //         {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log(data.message))
    //         .then(() => this.props.history.push("/graphicCards/add"))
    //         .catch(data => window.alert(data.message))
    // }



    render(){

        return(
            <FillInForm retrieveUrl={null} submitHandle={this.submitHandle}
            pushUrl={"http://localhost:8080/v1/graphic_cards"} column={["price", "brand", "label"]}
            jump={'/'}/>
        )
    }

}

export default withRouter(Create);