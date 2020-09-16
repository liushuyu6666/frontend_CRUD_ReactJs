import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";


class FillInForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            warning: {},
            color: {},
            submitting: false,
            serverFeedback: "",
            fill: "",
        }
        this.graphicCardColumn = ["price", "brand", "label"];
    }

    retrieveTarget = () => {
        if(this.props.retrieveUrl !== null){
            fetch(this.props.retrieveUrl,
                {method: "GET"})
                .then(res => res.json())
                .then(data => this.setState({data: data.result}))
                .catch(data => console.error(data));
        }
    }

    checkValidation = (event) => {
        event.preventDefault();
        if (event.target.id === "price"){
            if(event.target.value * 1 <= 0 ||
                Number.isNaN(event.target.value * 1)){
                this.setState({warning: {...this.state.warning,
                            price: "price should be positive number"},
                        color: {...this.state.color,
                            price: "is-invalid"}})
            }
            else{
                this.setState({warning: {...this.state.warning,
                        price: "correct"},
                    color: {...this.state.color,
                        price: "is-valid"}})
            }
        }
        if (event.target.id === "label"){
            if(event.target.value === ""){
                this.setState({warning: {...this.state.warning,
                            label: "label should not be empty"},
                        color: {...this.state.color,
                            label: "is-invalid"}})
            }
            else{
                this.setState({warning: {...this.state.warning,
                        label: "correct"},
                    color: {...this.state.color,
                        label: "is-valid"}})
            }
        }
        if (event.target.id === "brand"){
            if(event.target.value === ""){
                this.setState({warning: {...this.state.warning,
                            brand: "brand should not be empty"},
                        color: {...this.state.color,
                            brand: "is-invalid"}})
            }
            else{
                this.setState({warning: {...this.state.warning,
                        brand: "correct"},
                    color: {...this.state.color,
                        brand: "is-valid"}})
            }
        }
    }

    checkAndUpdate = (event) => {
        event.preventDefault();
        let validateToken = true;
        if(Object.keys(this.state.color).length < 1){
            this.setState({fill: "can't be empty"})
            validateToken = false;
        }
        else{
            Object.values(this.state.color).map(item => {
                console.log(item);
                if(item !== "is-valid"){
                    validateToken = false;
                }
            })
        }
        if(validateToken){
            let data = {}
            this.props.column.map((item) => {
                data[item] = document.getElementById(item).value;
            })
            this.setState({submitting: true});
            fetch(this.props.pushUrl,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => this.setState({serverFeedback: data.message, submitting: false},
                    () => {this.props.history.push(`/`)}))
                .catch(data => this.setState({serverFeedback: data.error, submitting: false}))
        }
    }

    render(){
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <form className={"col"}>
                        {this.props.column.map(item =>
                            <div className="form-row">
                                <label htmlFor={item}>{item}</label>
                                <input type="text" className={"form-control " + this.state.color[item]}
                                       id={item} defaultValue={this.state.data[item]}
                                       onChange={this.checkValidation}/>
                                <div id={item + "small"} className="form-text text-muted">
                                    {this.state.warning[item] != null ?
                                        this.state.warning[item] : "please input "+ item}
                                </div>
                            </div>
                        )}
                        <button disabled={this.state.submitting} type="submit" className="btn btn-primary"
                                onClick={this.checkAndUpdate}>Update</button>
                    </form>
                    <div className={"col col-md-5"}>
                        {this.state.fill}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.retrieveTarget();
    }

}

export default withRouter(FillInForm);