import React, {Component} from 'react';
import Table from './Table';
import {
    withRouter,
    Link
} from "react-router-dom";

class Display extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
        }
    }

    getList = () =>{
        fetch("http://localhost:8080/v1/graphic_cards",
            {method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => this.setState({data: data.result},
                () => console.log(this.state.data)))
    }

    deleteConfirmation = (event) => {
        event.preventDefault();
        let targetId = event.target.name;
        if(window.confirm("Do you want to delete this record?")){
            fetch("http://localhost:8080/v1/graphic_cards/" + targetId,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
                    },
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .then(() => this.getList())
        }
        else{
            alert("Cancel the delete action");
        }
    }

    render(){
        let graphicCardColumn = ["id", "price", "brand", "label"];
        return(
            <Table data={this.state.data} columns={graphicCardColumn}
                   deleteHandler={this.deleteConfirmation}/>
        )
    }

    componentDidMount(){
        this.getList();
    }

}

export default withRouter(Display);