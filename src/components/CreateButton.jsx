import React from "react";


export default class CreateButton extends React.PureComponent{
    constructor(props) {
        super(props);
        // console.log(props);
    }

    render() {
        return (
            <button type={"button"} className={"btn btn-success"}
                    onClick={this.createPost}>insert</button>
        );
    }

}