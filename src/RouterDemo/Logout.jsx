import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Logout extends Component{
    constructor(props) {
        super(props);
        localStorage.setItem('token', '');
    }



    render(){
        return(
            Logout
        )
    }
}

export default withRouter(Logout);