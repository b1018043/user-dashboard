import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/edit/:id"/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
