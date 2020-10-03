import React, { Component } from "react";
import "./Main.scss";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/url";
import timeSince from "../services/timeSince";

class MainPage extends Component {
  constructor(props) {
    super();
    this.state = {
      worries: [],
      showoff: {},
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/worry?limit=4", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) this.setState({ worries: json.result });
        else console.log(json.message);
      });
    fetch(BASE_URL + "/showoff", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.showoff);
        if (json.status) this.setState({ showoff: json.result });
        else console.log(json.message);
      });
  }

  render() {
    const { worries, showoff } = this.state;
    return (
      <div id="main">
        <SideBar />
        <main>
          <div className="entrustBox">
            <div className="button">
              <Link to="/entrust">Entrust your pet trustly!!</Link>
            </div>
            <div className="button">
              <Link to="/raise">Want to keep a pet?</Link>
            </div>
          </div>
          <div className="worries">
            <div className="menu">
              <div className="title">Worries</div>
              <i className="fas fa-plus"></i>
            </div>
            <div className="main">
              {worries.map((worry, idx) => (
                <div className="item" key={idx}>
                  <div className="text">{worry.Title}</div>
                  <div className="author">{worry.Username}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="showoff">
            <div className="menu">
              <div className="title">Show off your pets</div>
              <i className="fas fa-plus"></i>
            </div>
            <div className="main">
              <div className="thumbnail">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${showoff.ImgUrl})`,
                  }}
                ></div>
              </div>
              <div className="textbox">
                <div className="text">{showoff.Text}</div>
              </div>
            </div>
            <div className="ago">{timeSince(showoff.Date)} ago</div>
          </div>
        </main>
      </div>
    );
  }
}

export default MainPage;
