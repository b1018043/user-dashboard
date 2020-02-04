import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import UserEdit from "./components/UserEdit";
import UserAdd from "./components/UserAdd";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/edit/:id" component={UserEdit}/>
          <Route exact path="/add" component={UserAdd}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
