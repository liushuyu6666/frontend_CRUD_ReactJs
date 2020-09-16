import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";


class FillInForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            price: ["this is price", "form-control", false],
            brand: ["this is brand", "form-control", false],
            label: ["this is label", "form-control", false],
            disable: true,
            serverFeedback: "",
        };
    }

    checkPositiveValidation = (value) => {
        if(value * 1 <= 0 ||
        Number.isNaN(value * 1)){
            return ["must be positive number",
                "form-control is-invalid", false];
        }
        else return ["correct", "form-control is-valid", true];
    }

    checkStringValidation = (value) => {
        if(value === ""){
            return ["shouldn't be empty",
                "form-control is-invalid", false];
        }
        else return ["correct", "form-control is-valid", true];
    }

    /** update props on each change */
    changeHandle = (event) => {
        event.preventDefault();
        if(event.target.id === "price"){
            this.setState({price:
                    this.checkPositiveValidation(event.target.value)});
        }
        else if(event.target.id === "brand"){
            this.setState({brand:
                    this.checkStringValidation(event.target.value)});
        }
        else if(event.target.id === "label"){
            this.setState({label:
                    this.checkStringValidation(event.target.value)});
        }
    }

    buttonDisable = () => {
        if(this.state.price[2] === true &&
            this.state.brand[2] === true &&
            this.state.label[2] === true){
            this.setState({disable: false}, () =>{
                console.log(this.state.disable);
            });
        }
        else{
            this.setState({disable: true});
        }
    }

    submitHandle = (event) => {
        event.preventDefault();
        let data = {}
        this.props.column.map((item) => {
            data[item] = document.getElementById(item).value;
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
            .then(data => console.log(data.message))
            .then(() => this.props.history.push(this.props.jump))
            .catch(data => window.alert(data.message))
    }

    render(){
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <form className={"col"}>
                        {this.props.column.map(item =>
                            <div className="form-row">
                                <label htmlFor={item}>{item}</label>
                                <input type="text" className={this.state[item][1]}
                                       id={item} defaultValue={this.state.data[item]}
                                       onChange={this.changeHandle}/>
                                <div id={item + "small"} className="form-text text-muted">
                                    {this.state[item][0]}
                                </div>
                            </div>
                        )}
                        <button disabled={!(this.state.price[2] === true &&
                        this.state.brand[2] === true &&
                        this.state.label[2] === true)} type="submit" className="btn btn-primary"
                                onClick={this.submitHandle}>Update</button>
                    </form>
                    <div className={"col col-md-5"}>
                        {this.state.fill}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.props.retrieveUrl !== null){
            fetch(this.props.retrieveUrl,
                {method: "GET"})
                .then(res => res.json())
                .then(data => this.setState({data: data.result,
                price: ["this is price", "form-control", true],
                brand: ["this is brand", "form-control", true],
                label: ["this is label", "form-control", true]}))
                .catch(data => console.error(data));
        }
    }

}

export default withRouter(FillInForm);