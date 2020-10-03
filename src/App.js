import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/Main";
import Entrust from "./pages/Entrust";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/main" component={MainPage} />
          <Route path="/Entrust" component={Entrust} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

/** 
  handlechange = (event) =>
    this.setState({ [event.target.name]: event.target.value });
*/
