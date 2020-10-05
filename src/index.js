import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Login from "./RouterDemo/Login";
import Register from "./RouterDemo/Register";
import Template from "./RouterDemo/Template";
import Display from "./RouterDemo/Display";
import Edit from "./RouterDemo/Edit";
import Create from "./RouterDemo/Create";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact>
                <Login/>
            </Route>
            <Route path="/register" exact>
                <Register/>
            </Route>
            <Route path="/home" exact>
                <Template>
                    <Display/>
                </Template>
            </Route>
            <Route path="/graphicCards/:id/edit">
                <Template>
                    <Edit/>
                </Template>
            </Route>
            <Route path="/graphicCards/add">
                <Template>
                    <Create/>
                </Template>
            </Route>
        </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
