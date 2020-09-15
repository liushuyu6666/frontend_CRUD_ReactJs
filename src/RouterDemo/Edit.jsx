import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Edit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            warning: {},
            color: {},
            submitting: false,
            serverFeedback: "",
        }
    }

    retrieveTarget = () => {
        fetch("http://localhost:8080/v1/graphic_cards/35",
            {method: "GET"})
            .then(res => res.json())
            .then(data => this.setState({data: data.result}))
    }

    checkValidation = (event) => {
        event.preventDefault();
        if (event.target.id === "price"){
            if(event.target.value * 1 <= 0 ||
                Number.isNaN(event.target.value * 1)){
                this.setState({warning: {...this.state.warning,
                            price: "price should be positive number"},
                            color: {...this.state.color,
                            price: "is-invalid"}},
                    () => console.log(this.state.warning))
            }
            else{
                this.setState({warning: {...this.state.warning,
                        price: ""},
                        color: {...this.state.color,
                        price: "is-valid"}})
            }
        }
        if (event.target.id === "label"){
            if(event.target.value === ""){
                this.setState({warning: {...this.state.warning,
                            label: "label should not be empty"},
                            color: {...this.state.color,
                            label: "is-invalid"}},
                    () => console.log(this.state.warning))
            }
            else{
                this.setState({warning: {...this.state.warning,
                        label: ""},
                        color: {...this.state.color,
                        label: "is-valid"}})
            }
        }
        if (event.target.id === "brand"){
            if(event.target.value === ""){
                this.setState({warning: {...this.state.warning,
                            brand: "brand should not be empty"},
                        color: {...this.state.color,
                            brand: "is-invalid"}},
                    () => console.log(this.state.warning))
            }
            else{
                this.setState({warning: {...this.state.warning,
                        brand: ""},
                    color: {...this.state.color,
                        brand: "is-valid"}})
            }
        }
    }

    checkAndUpdate = () => {
        let validateToken = true;
        Object.values(this.state.color).map(item => {
            if(item === "is-invalid"){
                validateToken = false;
            }
        })
        if(validateToken){
            let data = {}
            let column = ["price", "brand", "label"]
            column.map((item) => {
                data[item] = document.getElementById(item).value;
            })
            console.log(data);
            this.setState({submitting: true});
            fetch("http://localhost:8080/v1/graphic_cards/35",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => this.setState({serverFeedback: data.message, submitting: false}))
                .catch(data => this.setState({serverFeedback: data.error, submitting: false}))
        }
    }

    render(){
        let graphicCardColumn = ["price", "brand", "label"];
        return(

            <form>
                {Object.keys(this.state.data).length > 0 &&
                graphicCardColumn.map(item =>
                <div className="form-row">
                    <label htmlFor={item}>{item}</label>
                    <input type="text" className={"form-control " + this.state.color[item]}
                           id={item} aria-describedby="emailHelp"
                           defaultValue={this.state.data[item]}
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
        )
    }

    componentDidMount() {
        this.retrieveTarget();
    }

}

export default withRouter(Edit);