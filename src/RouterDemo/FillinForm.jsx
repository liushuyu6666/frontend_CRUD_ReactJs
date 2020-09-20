import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

/** input: props.column = {price: "checkPositive",
 * brand: "checkString", label: "checkString"} */
class FillInForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: {}, // initial data from backend if this table is for updating
            input: {}, // records input change
            validationCheck: {}, // check if the input is validated
            serverFeedback: "",
        };
        this.validationCheckInit();
    }

    checkPositiveValidation = (value) => {
        let ans;
        if(value * 1 <= 0 ||
        Number.isNaN(value * 1)){
            ans = ["must be positive number",
                "form-control is-invalid", false];
        }
        else ans = ["correct", "form-control is-valid", true];
        return ans;
    }

    checkStringValidation = (value) => {
        let ans;
        if(value === ""){
            ans = ["shouldn't be empty",
                "form-control is-invalid", false];
        }
        else ans = ["correct", "form-control is-valid", true];
        return ans;
    }

/******              update props on each change */
    changeHandle = (event) => {
        event.preventDefault();
        Object.keys(this.props.column).forEach(k => {
            if(event.target.id === k){
                this.setState({input: {...this.state.input, [k]: event.target.value}});
                if(this.props.column[k] === "checkPositive"){
                    this.setState({validationCheck: {...this.state.validationCheck,
                        [k]: this.checkPositiveValidation(event.target.value)}})
                }
                else if(this.props.column[k] === "checkString"){
                    // console.log("change handle: " + event.target.id);
                    this.setState({validationCheck: {...this.state.validationCheck,
                            [k]: this.checkStringValidation(event.target.value)}})
                }
            }
        })
    }

    submitHandle = (event) => {
        event.preventDefault();
        let data = {}
        Object.keys(this.props.column).forEach(k => {
            data[k] = this.state.input[k];
        })
        fetch(this.props.pushUrl,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(() => {
                if(this.props.jump !== null){
                    this.props.history.push(this.props.jump)
                }
                else{
                    this.setState({input:{}}, () => console.log(this.state.input));
                }
            })
            .catch(data => window.alert(data.message))
    }

    // initialize validationCheck, validationCheck: {col1: [prompt text, box color, button able]}
    validationCheckInit = () => {
        let button = (this.props.purpose === "update");
        Object.keys(this.props.column).forEach(k => {
            this.state.validationCheck[k] = ["this is " + k, "form-control", button];
        })
    }

    render(){

        return(
            <div className={"container"}>
                <div className={"row"}>
                    <form className={"col"}>
                        {Object.keys(this.props.column).length > 0 &&
/*****          tips: must use map here not forEach   ***********/
                        Object.keys(this.props.column).map(item =>
                           <div className="form-row">
                                <label
                                    htmlFor={item}>
                                    {item}
                                </label>
                                <input type="text"
                                       className={this.state.validationCheck[item][1]}
                                       id={item}
                                       value={this.state.input[item]}
                                       onChange={this.changeHandle}
                                />
                                <div
                                    id={item + "small"}
                                    className="form-text text-muted">
                                    {this.state.validationCheck[item][0]}
                                </div>
                            </div>
                        )}
                        <button disabled={!this.buttonDisable()} type="submit" className="btn btn-primary"
                                onClick={this.submitHandle}>submit</button>
                    </form>
                    <div className={"col col-md-5"}>
                        {this.state.fill}
                    </div>
                </div>
            </div>
        )
    }


    buttonDisable = () => {
        let disable = true;
        Object.keys(this.state.validationCheck).forEach(k => {
            disable = this.state.validationCheck[k][2] && disable;
        })
        return disable;
    }



    createForm = () => {
    }

    updateForm = () => {
        fetch(this.props.retrieveUrl,
            {method: "GET"})
            .then(res => res.json())
            .then(data => this.setState({input: data.result}))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        if(this.props.purpose === "update"){
            this.updateForm();
        }
        if(this.props.purpose === "create"){
            this.createForm();
        }
    }

}

export default withRouter(FillInForm);