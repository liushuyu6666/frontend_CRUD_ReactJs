import React, {Component} from "react";
import {Link} from "react-router-dom";
import Logout from "./Logout";

class Template extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: "",
        }
    }

    deleteToken = () => {
        localStorage.setItem('token', '');
    }

    render(){
        return(
            <>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link to="/home" className="nav-link" role="tab">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        {/*<Link to="/graphicCards/35/edit" className="nav-link" role="tab"*/}
                        {/*   aria-controls="pills-profile" aria-selected="false">*/}
                        {/*    Edit Graphic card*/}
                        {/*</Link>*/}
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/graphicCards/add" className="nav-link" role="tab">
                            Add new graphic card
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/" className="nav-link" role="tab" onClick={this.deleteToken}>
                            Logout
                        </Link>
                    </li>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Template;