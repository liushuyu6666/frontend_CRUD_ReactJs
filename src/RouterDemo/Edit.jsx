import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";

class Edit extends Component{

    constructor(props) {
        super(props);
        this.url = "http://localhost:8080/v1/graphic_cards/" + this.props.match.params.id;
        this.jumpTo = '/';
    }

    // submitHandle = (event) => {
    //     let url = "http://localhost:8080/v1/graphic_cards/" + this.props.match.params.id;
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
    //         .then(() => this.props.history.push(`/`))
    //         .catch(data => window.alert(data.message))
    // }



    render(){
        // console.log(url);
        return(
           <FillInForm retrieveUrl={this.url}
           pushUrl={this.url} column={["price", "brand", "label"]} jump={this.jumpTo}/>
        )
    }

}

export default withRouter(Edit);