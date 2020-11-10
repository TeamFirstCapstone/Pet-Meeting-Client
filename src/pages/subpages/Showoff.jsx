import React, { Component } from "react";
import "./scss/showoff.scss";
import { showoff } from "../../service";

class Showoff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showoffs: [],
    };
  }

  // TODO: # people made answers 부분 추가하기

  componentDidMount() {
    showoff.list(0, 10).then((showoffs) => this.setState({ showoffs }));
  }

  handleTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { showoffs } = this.state;
    return (
      <div id="Showoff">
        {showoffs.map((showoff, idx) => (
          <div className="box-container" key={idx}>
            <div className="PersonProfile">
              <div>
                <span className="name"> {showoff.Username}</span>
              </div>
            </div>
            <img className="ShowOffPageProfile" src={showoff.ImgUrl} alt="" />
            <div className="viewsIcon-container">
              <span className="views"> 15 people made answers</span>
              <ul className="actions">
                <li>
                  <i
                    className="fas fa-bookmark"
                    onClick={() => alert("Not Implemented!")}
                  />
                </li>
                <li>
                  <i
                    className="fas fa-share"
                    onClick={() => alert("Not Implemented!")}
                  />
                </li>
              </ul>
            </div>
            <div className="SubText">{showoff.Text}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Showoff;
