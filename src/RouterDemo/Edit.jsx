import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";

class Edit extends Component{

    constructor(props) {
        super(props);
    }



    render(){
        let url = "http://localhost:8080/v1/graphic_cards/" + this.props.match.params.id;
        return(
           <FillInForm retrieveUrl={url}
           pushUrl={url} column={["price", "brand", "label"]}/>
        )
    }

}

export default withRouter(Edit);