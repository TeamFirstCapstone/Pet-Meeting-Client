import React, { Component } from "react";
import imgPetMetting from "../images/Pet Metting.png";

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  submit() {}

  render() {
    return (
      <div>
        <img className="logo" src={imgPetMetting} alt="" />
        <div className="title">Login</div>
        <div className="formBox">
          <div className="username"></div>
          <div className="password"></div>
        </div>
      </div>
    );
  }
}

export default HomePage;
