import React, { Component } from "react";
import "./scss/WorryDetail.scss";

import { worry } from "../../service";

class WorryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Text: "",
      Comments: [],
    };
  }

  componentDidMount() {
    const { wid } = this.props.match.params;
    worry.get(wid).then(({ Title, Text }) => this.setState({ Title, Text }));
    worry
      .listComment(wid, 0, 10)
      .then((Comments) => this.setState({ Comments }));
  }

  render() {
    const { Title, Text } = this.state;
    const { Comments } = this.state;
    return (
      <div id="WorryDetail">
        <h1>Worry Detail Page</h1>
        <div className="form-horizontal">
          <div className="article-title">{Title}</div>
          <div className="article-body">{Text}</div>
        </div>

        <div className="title">Comment</div>
        <div className="HCB_comment_box">
          {Comments.map((comment, idx) => (
            <div className="box" key={idx}>
              <div className="name">{comment.Username}</div>
              <div className="content">{comment.Text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WorryDetail;
