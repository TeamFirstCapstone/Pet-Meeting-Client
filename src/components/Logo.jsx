import React, { Component } from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";
import imgLogo from "../images/logo.png";

class Logo extends Component {
  constructor(props) {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  render() {
    return (
      <Link to="/" id="logo">
        <img src={imgLogo} alt="" />
      </Link>
    );
  }
}

export default Logo;
