import React, {Component} from "react";
import {withRouter} from "react-router-dom";

/** props:
 * 1) data [{}] result of response
 * 2) column []
 * 3) color
 * 4) checkValidation function handle
 * 5) warning
 * 6) checkAndUpdate function handle
 * 7) submitting*/
class FillinForm extends Component{

    constructor(props) {
        super(props);
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

export default withRouter(FillinForm);