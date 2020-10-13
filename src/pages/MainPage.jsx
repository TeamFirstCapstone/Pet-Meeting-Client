import React, { Component } from "react";
import SideBar from "../components/SideBar";
import Choosing from "./components/Choosing";
import Main from "./components/Main";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // main,
      page: "choosing",
    };
  }

  statechange = (state) => {
    console.log(state);
    this.setState(state);
  };

  render() {
    const { page } = this.state;
    return (
      <div id="main">
        <SideBar statechange={this.statechange} />
        {page === "main" ? <Main statechange={this.statechange} /> : null}
        {page === "choosing" ? (
          <Choosing statechange={this.statechange} />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
