import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import UserEdit from "./components/UserEdit";
import UserAdd from "./components/UserAdd";
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/edit/:id" component={UserEdit}/>
          <Route exact path="/add" component={UserAdd}/>
        </Switch>
    </div>
  );
}

export default App;
