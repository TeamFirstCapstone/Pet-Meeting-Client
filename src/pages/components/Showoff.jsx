import React, { Component } from "react";
import { BASE_URL } from "../../config/url";
import { download } from "../../service/image";
import "./Showoff.scss";

// 스크롤 내리면 꾸준히 가지고 오는 기능?
class Showoff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showoffs: [],
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/showoff?limit=20&offset=0")
      .then((res) => res.json())
      .then((json) => {
        var showoffs = json.result;
        const promises = showoffs.map((showoff, idx, showoffs) =>
          download(showoff.Filename).then((url) => (showoffs[idx].imgUrl = url))
        );
        Promise.all(promises).then(() => this.setState({ showoffs }));
      });
  }

  render() {
    const { showoffs } = this.state;
    console.log(showoffs);
    return (
      <div id="showoff">
        {showoffs.map((showoff, idx) => (
          <div className="box-container" key={idx}>
            <div className="PersonProfile">
              <img className="WorryPageProfile" src={showoff.imgUrl} alt="" />
              <div>
                <span className="name"> Wittgenstein</span>
              </div>
            </div>
            <img
              className="ShowOffPageProfile"
              src="/src/images/showOffpageimage.png"
            />
            <div className="viewsIcon-container">
              <span className="views"> 15 people made answers</span>
              <ul className="actions">
                <li>
                  <button>
                    <i className="fas fa-bookmark"></i>
                  </button>
                </li>
                <li>
                  <button>
                    <i className="fas fa-comment"></i>
                  </button>
                </li>
                <li>
                  <button>
                    <i className="fas fa-share"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div className="SubText">
              New family Members
              <br />
              how adorable they are~
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Showoff;
