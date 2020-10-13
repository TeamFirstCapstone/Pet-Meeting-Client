import React, { Component } from "react";
import { download } from "../services/image";
import "./PersonCard.scss";

class PersonCard extends Component {
  constructor(props) {
    super();
    this.state = {
      src: null,
      ...props,
    };
  }

  componentDidMount() {
    download(this.props.Filename).then((url) => {
      this.setState({ ImgUrl: url });
    });
  }

  statechange = (state) => this.setState(state);

  click() {
    this.props.statechange({ chatPartner: this.state });
  }

  render() {
    const { Username, Text, ImgUrl } = this.state;
    return (
      <div id="petCard" onClick={() => this.click()}>
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Username}</div>
          <div className="text">{Text}</div>
        </div>
      </div>
    );
  }
}

export default PersonCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
