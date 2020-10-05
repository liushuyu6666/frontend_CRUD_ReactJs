import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import FillInForm from "./FillinForm";

class Edit extends Component{

    constructor(props) {
        super(props);
        this.url = "http://localhost:8080/v1/graphic_cards/" + this.props.match.params.id;
        this.jumpTo = '/home';
    }

    render(){
        // console.log(url);
        return(
           <FillInForm
               retrieveUrl={this.url}
               submitHandle={this.submitHandle}
               pushUrl={this.url}
               column={{"price": "checkPositive",
                   "brand": "checkString", "label": "checkString"}}
               purpose="update"
               jump={this.jumpTo}/>
        )
    }

}

export default withRouter(Edit);