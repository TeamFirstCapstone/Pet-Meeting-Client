import React, { Component } from "react";
import "./scss/Main.scss";
import timeSince from "../../service/timeSince";
import { worry, showoff } from "../../service";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      worries: [],
      showoff: {
        Text: "",
        ImgUrl: null,
        Date: "2020-01-01",
      },
    };
  }

  componentDidMount() {
    worry.list(0, 4).then((worries) => this.setState({ worries }));
    showoff.best().then((showoff) => this.setState({ showoff }));
  }

  render() {
    const { worries, showoff } = this.state;
    const { history } = this.props;

    return (
      <main id="mainpage">
        <div className="entrustBox">
          <div className="button" onClick={() => history.push("/main/entrust")}>
            Entrust your pet trustly!!
          </div>
          <div className="button" onClick={() => history.push("/main/raise")}>
            Want to keep a pet?
          </div>
        </div>
        <div className="worries">
          <div className="menu">
            <div className="title">Worries</div>
            <i
              className="fas fa-plus"
              onClick={() => history.push("/main/worry")}
            ></i>
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
            <i
              className="fas fa-plus"
              onClick={() => history.push("/main/showoff")}
            ></i>
          </div>
          <div className="main">
            <div className="thumbnail">
              <img className="img" src={showoff.ImgUrl} alt="" />
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
