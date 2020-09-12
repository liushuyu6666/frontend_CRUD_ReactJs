import React from "react";


export default class DeleteButton extends React.PureComponent{
    constructor(props) {
        super(props);
        // console.log(props);
    }

    DeleteOneRow = (event) => {
        console.log(this.props.whichRow);
        this.props.removeHandle(event, this.props.whichRow);
    }

    render() {
        return (
            <button onClick={this.DeleteOneRow}>x</button>
        )
    }

}