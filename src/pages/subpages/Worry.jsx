import React, { Component } from "react";
import "./scss/worry.scss";
import { worry } from "../../service";

class Worry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worries: [],
    };
  }

  componentDidMount() {
    worry.list(0, 10).then((worries) => this.setState({ worries }));
  }

  handleTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { worries } = this.state;
    const { history } = this.props;
    return (
      <div id="Worry">
        <div className="flex-container">
          {worries.map((worry, idx) => (
            <article className="worry" key={idx}>
              <h1> {worry.Title}</h1>
              <p onClick={() => history.push(`/main/worry/${worry.WID}`)}>
                {worry.Text}
              </p>

              <div className="viewsIcon-container">
                <span className="views"> 15 people made answers</span>
                <ul className="actions">
                  <li>
                    <i className="fas fa-bookmark" />
                  </li>
                  <li>
                    <i className="fas fa-comment" />
                  </li>
                  <li>
                    <i className="fas fa-share" />
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Worry;
