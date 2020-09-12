import React from "react";


export default class UpdateButton extends React.PureComponent{
    constructor(props) {
        super(props);
        // console.log(props);
    }

    updatePost = () => {
        // console.log(this.props.updateData)
        // parse updateData
        for(let [key, value] of Object.entries(this.props.updateData)) {
            let url = "http://localhost:8080/v1/graphic_cards/" + key.split("@")[0];
            let fieldName = key.split("@")[1];
            let updateItem = {}; updateItem[fieldName] = value;
            // console.log(updateItem);
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateItem)
            }
            fetch(url, options)
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }

    }

    render() {
        return (
            <button type={"button"} className={"btn btn-success"}
                    onClick={this.updatePost}>update</button>
        );
    }

}