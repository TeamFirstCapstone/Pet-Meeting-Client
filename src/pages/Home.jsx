import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import imgPage1 from "../images/page1.png";
import imgPage2 from "../images/page2.png";
import imgPage3 from "../images/page3.png";
import imgSonSunghun from "../images/SonSunghun.jpg";
import Logo from "../components/Logo";

class HomePage extends Component {
  constructor(props) {
    super();
    this.logined = false;

    this.pageOffset = {
      first: "10vh",
      second: "-90vh",
      third: "-190vh",
    };

    this.state = {
      username: null,
      password: null,
      top: this.pageOffset.first,
    };
  }

  moveHistory = (site) => this.props.hisotry.push(site);

  componentDidMount = () => {
    window.addEventListener("wheel", (e) => {
      const { top } = this.state;
      const { first, second, third } = this.pageOffset;
      if (e.wheelDeltaY < 0) {
        if (top === first) this.setState({ top: second });
        if (top === second) this.setState({ top: third });
      } else {
        if (top === second) this.setState({ top: first });
        if (top === third) this.setState({ top: second });
      }
    });
  };

  render() {
    const { top } = this.state;
    return (
      <div id="home">
        <nav>
          <Logo />
          <ul>
            <li
              className="home"
              onClick={() => this.setState({ top: this.pageOffset.first })}
            >
              Home
            </li>
            <li
              className="about"
              onClick={() => this.setState({ top: this.pageOffset.second })}
            >
              About
            </li>
            <li
              className="contact"
              onClick={() => this.setState({ top: this.pageOffset.third })}
            >
              Contact
            </li>
          </ul>
          <div className="signin">
            <Link to="/login">Signin</Link>
          </div>
        </nav>
        <main style={{ top: top }}>
          <div className="page1">
            <div className="title">
              Give your pet <br />
              perfect experience
            </div>
            <div className="subtitle">Entrust your Lover</div>
            <img className="background" src={imgPage1} alt="" />
          </div>

          <div className="page2">
            <div className="title">
              Do you want to entrust your pet for free?
              <br />
              Or
              <br />
              Do you want to grow your favorite pet for a while?
            </div>
            <div className="subtitle">
              We can give you a perfect experience <br /> whatever you want
            </div>
            <img src={imgPage2} alt="" className="background" />
          </div>
          <div className="page3">
            <div className="profile">
              <img src={imgSonSunghun} alt="" />
              <p>
                Son sunghun <br /> ChungAng Univ. <br /> sonjeff@naver.com
              </p>
            </div>
            <div className="profile">
              <img src={imgSonSunghun} alt="" />
              <p>
                Son sunghun <br /> ChungAng Univ. <br /> sonjeff@naver.com
              </p>
            </div>
            <div className="profile">
              <img src={imgSonSunghun} alt="" />
              <p>
                Son sunghun <br /> ChungAng Univ. <br /> sonjeff@naver.com
              </p>
            </div>

            <img src={imgPage3} alt="" className="background" />
          </div>
        </main>
      </div>
    );
  }
}

export default HomePage;
