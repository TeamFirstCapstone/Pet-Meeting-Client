import React, { Component } from "react";
import "./Main.scss";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/url";
import timeSince from "../../services/timeSince";
import { download } from "../../services/image";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      worries: [],
      showoff: {},
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/worry/list?limit=4", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) this.setState({ worries: json.result });
        else console.log(json.result);
      });
    fetch(BASE_URL + "/showoff/best", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        if (json.status)
          download(json.result.Filename).then((url) => {
            json.result.ImgUrl = url;
            this.setState({ showoff: json.result });
          });
        else console.log(json.result);
      });
  }

  render() {
    const { worries, showoff } = this.state;
    const { statechange } = this.props;
    return (
      <main id="mainpage">
        <div className="entrustBox">
          <div
            className="button"
            onClick={() => statechange({ page: "entrust" })}
          >
            Entrust your pet trustly!!
          </div>
          <div
            className="button"
            onClick={() => statechange({ page: "choosing" })}
          >
            Want to keep a pet?
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
    );
  }
}

export default Main;
