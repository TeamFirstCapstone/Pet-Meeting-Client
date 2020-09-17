import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import imgBackground from "../images/home_background.png";
import Logo from "../components/Logo";

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
      <div id="home">
        <nav>
          <Logo />
          <ul>
            <li className="home">Home</li>
            <li className="about">About</li>
            <li className="contact">Contact</li>
          </ul>
          <div className="signin">
            <Link to="/login">Signin</Link>
          </div>
        </nav>
        <main>
          <div className="title">
            Give your pet <br />
            perfect experience
          </div>
          <div className="subtitle">Entrust your Lover</div>
        </main>
        <img className="home_background" src={imgBackground} alt="" />
      </div>
    );
  }
}

export default HomePage;
