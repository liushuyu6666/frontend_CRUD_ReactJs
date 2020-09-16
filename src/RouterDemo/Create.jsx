import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";


class Create extends Component{

    constructor(props) {
        super(props);
    }



    render(){

        return(
            <FillInForm retrieveUrl={null} pushUrl={"http://localhost:8080/v1/graphic_cards"}
            column={["price", "brand", "label"]}/>
        )
    }

}

export default withRouter(Create);