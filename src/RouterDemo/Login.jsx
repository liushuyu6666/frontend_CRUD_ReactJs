import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: "",
        }
    }

    change = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    submit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/v1/login",{
            "method": "POST",
            "headers":{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: this.state.username,
            password: this.state.password})
        }).then(res => res.json())
            .then(res => {
                if(res.result !== null){
                    this.setState({err: "please wait, logging in"});
                    localStorage.setItem('token', res.result);
                    this.props.history.push('/home');
                }
                else{
                    this.setState({
                        err: res.msg
                    })
                }
            })
            .catch(err => this.setState({error: err.msg}, () => console.error(this.state)));

    }

    render(){
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <form className={"col-md-6"}>
                        <br/>
                        <h4>please Login</h4>
                        <br/>
                        <div className="form-row">
                            <label htmlFor="username">Username:</label>
                            <input
                                className="form-control"
                                type={"text"}
                                id={"username"}
                                name={"username"}
                                value={this.state.username}
                                onChange={this.change}/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                type={"password"}
                                id={"password"}
                                name={"password"}
                                value={this.state.password}
                                onChange={this.change}/>
                        </div>
                        <br/>
                        <div className="alert alert-danger" role="alert">
                            {this.state.err}
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.submit}>submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);