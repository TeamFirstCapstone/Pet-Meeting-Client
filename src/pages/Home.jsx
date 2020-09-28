import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import imgBackground from "../images/home_background.png";
import Logo from "../components/Logo";
import user from "../services/user";

class HomePage extends Component {
  constructor(props) {
    super();
    this.logined = false;
    user.logined().then(({ status }) => (this.logined = status));
  }

  render() {
    console.log(this.logined);
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
            <Link to={this.logined ? "/main" : "/login"}>Signin</Link>
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
