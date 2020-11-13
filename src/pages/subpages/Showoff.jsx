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
    showoff.list(0, 10).then((showoffs) => {
      showoffs.forEach((sf) =>
        showoff
          .get_vote(sf.SID)
          .then((vote) => (sf.Vote = vote))
          .catch(() => (sf.Vote = null))
      );
      this.setState({ showoffs });
    });
  }

  handleTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

  vote = (idx, value) => {
    console.log(idx, value);
    var { showoffs } = this.state;
    showoffs[idx].Vote = value;
    this.setState({ showoffs });
    showoff.set_vote(showoffs[idx].SID, value);
  };

  render() {
    const { showoffs, vote } = this.state;
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
              <div className="score">this post got {vote} scores </div>

              <ul className="actions">
                <ul className="heart">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <li
                      key={v}
                      className={`heart_score ${
                        showoff.Vote === v ? "hearted" : ""
                      }`}
                      onClick={() => this.vote(idx, v)}
                    >
                      {v}
                    </li>
                  ))}
                </ul>
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
