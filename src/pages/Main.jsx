import React, { Component } from "react";
import "./Main.scss";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { logined } from "../services/user";

class MainPage extends Component {
  constructor(props) {
    super();

    this.id = 2;

    // logined().then(({ status, id }) => {
    //   if (!status) props.history.push("/login"); // Only for developing, remove it
    //   this.id = id;
    // });
  }

  componentDidMount = () => {};

  render() {
    return (
      <div id="main">
        <SideBar id={this.id} />
      </div>
    );
  }
}

export default MainPage;
