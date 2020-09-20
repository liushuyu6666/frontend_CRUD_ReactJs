import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";


class Create extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return(
            <FillInForm
                retrieveUrl={null}
                submitHandle={this.submitHandle}
                pushUrl={"http://localhost:8080/v1/graphic_cards"}
                column={{"price": "checkPositive",
                "brand": "checkString", "label": "checkString"}}
                purpose="create"
                jump={null}/>
        )
    }

}

export default withRouter(Create);