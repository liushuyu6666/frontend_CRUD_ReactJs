import React from 'react';
import logo from './logo.svg';
import './App.css';
import GraphicButton from "./components/GraphicButton";
import Display from "./RouterDemo/Display";
import Edit from "./RouterDemo/Edit";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Create from "./RouterDemo/Create";

function App() {
  return (
    <div className="App">
      <GraphicButton/>
    </div>
  );
}

// export default App;

function RouterApp() {
    return(
        <Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/graphicCards/33/edit">Graphic card with id: </Link>
                <Link to="/graphicCards/add">Add new graphic card</Link>
            </div>

            <Switch>
                <Route path="/" exact>
                    <Display/>
                </Route>
                <Route path="/graphicCards/:id/edit">
                    <Edit/>
                </Route>
                <Route path="/graphicCards/add">
                    <Create/>
                </Route>
            </Switch>
        </Router>
    )
}
export default RouterApp;
