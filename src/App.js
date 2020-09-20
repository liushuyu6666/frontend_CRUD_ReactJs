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


function clickHandle(){
    console.log("1");
    let chosenId = window.prompt("which id do you want to edit?");
    this.props.history.push(`/graphicCards/35/edit`);
}

// export default App;

function RouterApp() {
    return(

            <Router>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link to="/" className="nav-link" role="tab">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        {/*<Link to="/graphicCards/35/edit" className="nav-link" role="tab"*/}
                        {/*   aria-controls="pills-profile" aria-selected="false">*/}
                        {/*    Edit Graphic card*/}
                        {/*</Link>*/}
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/graphicCards/add" className="nav-link" role="tab">
                            Add new graphic card
                        </Link>
                    </li>
                </ul>
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


        // <Router>
        //     <ul className={"nav nav-pills mb-3"} role={"tablist"}>
        //         <li className={"nav-item"} role={"presentation"}>
        //             <Link to="/" className={"nav-link active"} role={"tab"} >
        //                 Home
        //             </Link>
        //         </li>
        //         <li className="nav-item" role={"presentation"}>
        //             <Link to="/graphicCards/33/edit" className={"nav-link"} role={"tab"} >
        //                 Edit Graphic card
        //             </Link>
        //         </li>
        //         <li className="nav-item" role={"presentation"}>
        //             <Link to="/graphicCards/add" className={"nav-link"} role={"tab"} >
        //                 Add new graphic card
        //             </Link>
        //         </li>
        //     </ul>
        //
        //     <Switch>
        //         <Route path="/" exact>
        //             <Display/>
        //         </Route>
        //         <Route path="/graphicCards/:id/edit">
        //             <Edit/>
        //         </Route>
        //         <Route path="/graphicCards/add">
        //             <Create/>
        //         </Route>
        //     </Switch>
        // </Router>
    )
}
export default RouterApp;
